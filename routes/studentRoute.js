const express = require('express');
const Student = require('../models/student');
const Qrcode = require('../models/qrcode');
const router = express.Router();

router.get('/', async (req, res) => {
    const student = req.student;
    // console.log(student);        undefined if not Signed in
    res.render('./student/studentHome', {
        student
    })
})
router.get('/signup', (req, res) => {
    res.clearCookie('StudentToken').render('./student/studentSignup')
})
router.post('/signup', async (req, res) => {
    try {
        const { fullname, prn, password } = req.body;
        await Student.create({
            fullname, prn, password
        })
        return res.redirect('/student')
    } catch (error) {
        return res.render('./student/studentSignin', {
            error: 'Incorrect Details!'
        })
    }
})

router.get('/signin', (req, res) => {
    res.clearCookie('StudentToken').render('./student/studentSignin');
})

router.post('/signin', async (req, res) => {
    const { prn, password } = req.body;
    const student = await Student.findOne({ prn })    //generate Token for one student only
    if (!student)
        return res.render('./student/studentSignin', {
            error: 'No Student Found. SignUp First'
        })
    try {
        const token = await Student.matchPasswordAndGenerateTokenStudent(prn, password);
        return res.cookie("StudentToken", token).redirect(`/student/${student._id}`)
    } catch (error) {
        return res.render('./student/studentSignin', {
            error: 'Idncorrect PRN or Passwor'
        })
    }
})

router.get('/logout', (req, res) => {
    res.clearCookie('StudentToken').redirect('/student');
})

router.get('/scan', async (req, res) => {
    try {
        const student = req.student;
        res.render('./student/studentScan', {
            student
        })
    } catch (error) {
        console.log('Error at /student/scan ', error);
    }
})
router.get('/attendanceMarked/:qrCodeId', async (req, res) => {
    try {
        const qrCodeId = req.params.qrCodeId;
        const student = await Student.findById(req.student._id);  //From student Token
        const checkQrCode = await Qrcode.findById(qrCodeId);

        if (!checkQrCode) return res.render('./student/attendanceMarked', { error: "Wrong QR Code Scanned!", student });

        if (checkQrCode?.markedByStudent[0]?.student.equals(student._id))
            return res.render('./student/attendanceMarked', { error: "You aldready Scanned this Bro!", student });

        checkQrCode.markedByStudent.push({
            student: student._id,
            scanTime: new Date(),
        })
        await checkQrCode.save();

        return res.render('./student/attendanceMarked', {
            student
        });
    } catch (error) {
        console.log("/attendanceMarked/:qrCodeId Route error", error);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const student = await Student.findById(id);
        const allQrCodes = await Qrcode.find({ "markedByStudent.student": id });

        return res.render('./student/studentHome', {
            student,
            allQrCodes,
        });
    } catch (error) {
        console.log("Error at /student/:id ", error);
        // Handle error or redirect
    }
});

module.exports = router;