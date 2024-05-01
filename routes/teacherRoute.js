const express = require('express');
const Student = require('../models/student');
const Teacher = require('../models/teacher');
const Qrcode = require('../models/qrcode');
const router = express.Router();
const qrcode = require('qrcode');
const moment = require('moment-timezone');
const { checkCookieForAuthenticationTeacher } = require('../middlewares/auth');

router.get('/', checkCookieForAuthenticationTeacher('teacherToken'), (req, res) => {
    const teacher = req.teacher;
    res.render('./teacher/teacherHome', {
        teacher
    })
})
router.get('/signup', (req, res) => {
    res.clearCookie('teacherToken').render('./teacher/teacherSignup')
})
router.post('/signup', async (req, res) => {
    try {
        const { fullname, faculty_id, subject, password } = req.body;
        await Teacher.create({
            fullname, faculty_id, subject, password
        })
        return res.render('./teacher/teacherHome')
    } catch (error) {
        return res.render('./teacher/teacherSignin',{
            error:'Please Sign In!'
        })
    }
})

router.get('/signin', (req, res) => {
    res.render('./teacher/teacherSignin');  
})
router.post('/signin', async (req, res) => {
    const { faculty_id, password } = req.body;
    const teacher = await Teacher.findOne({ faculty_id });
    try {
        const token = await Teacher.matchPasswordAndGenerateTokenTeacher(faculty_id, password);
        return res.cookie("teacherToken", token).redirect(`/teacher/${teacher._id}`)
    } catch (error) {
        return res.render('./teacher/teacherSignin', {
            error: 'Incorrect Faculty ID or Password'
        })
    }
})
router.get('/logout', (req, res) => {
    res.clearCookie('teacherToken').redirect('/');
})
router.get('/showQrCode',async(req,res)=>{
    const teacher = req.teacher;
    const lastQrCode = await Qrcode.find({teacherName:teacher.fullname})    //find returns an array
    .sort({ timestampField: -1 }).limit(1);
    if(lastQrCode.length == 0) return res.render('./teacher/teacherQrcode', {
        error:"Plese Generate QR Code First!",teacher
    })
    return res.render('./teacher/teacherQrcode', {
        lastQrCode
    })
})
router.get('/:id', async (req, res) => {
    const teacher = req.teacher;
    const teacherId = req.params.id;
    const allStudents = await Student.find({}, {fullname:1,prn:1,_id:1});
    // const qrcode = await Qrcode.find({teacherName:teacher.fullname});
    const qrcode = await Qrcode.find({teacherName:teacher.fullname}).populate('markedByStudent.student');
    return res.render('./teacher/teacherHome', {
        teacherId,teacher,qrcode,allStudents
    });
})
router.post('/scan/:id', async (req, res) => {
    try {
        const teacherId = req.params.id;
        const teacher = await Teacher.findById(teacherId); // getting teacher who generated this QR 

        const localTimeZone = 'Asia/Kolkata';
        let date = moment.tz(localTimeZone);
        let jsDate = date.toDate();
        await Qrcode.create({            //saving to mongodb database
            teacherName: teacher.fullname,
            teacherSubject: teacher.subject,
            createdByTeacher: [{
                teacher: teacherId,
                date: jsDate
            }]
        })
        let allQrCodes = await Qrcode.findOne({"createdByTeacher.date":jsDate});
        const QrcodeId = allQrCodes._id;
        const qrCodeData = { redirectTo: QrcodeId }

        const jsonString = JSON.stringify(qrCodeData);
        qrcode.toDataURL(jsonString, { errorCorrectionLevel: 'L' }, async (err, url) => {    //qrcode module
            if (err) {
                console.error('Error generating QR code URL:', err);
                return res.status(500).render('./teacher/teacherHome',{
                    error:'Error generating QR code URL'
                });}
            await Qrcode.updateOne(         //saving url to database 
                { _id: allQrCodes._id },
                { qrCodeURL: url.toString() }
            )
            // .then((s)=>console.log(s)).catch((e)=>console.log("here",e));
            res.render('./teacher/teacherQrcode', {
                qrCode: url,
                teacher,
                allQrCodes
            })
        })
    } catch (error) {
        console.log("Error at /teacher/scan/:id", error);
    }
})
module.exports = router;