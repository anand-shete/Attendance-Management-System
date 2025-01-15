const mongoose = require('mongoose');
const {randomBytes, createHmac} = require('crypto')
const teacherSchema = mongoose.Schema({
    fullname: {
        type: String,
        required:true,
        unique:true
    },
    faculty_id: {
        type: String,
        required:true,
        unique:true,
        ref :'qrcode',
    },
    password: {
        type: String,
        required:true
    },
    subject:{
        type:String,
        required:true,
    },
    salt: {
        type: String,
    },
    profileImageURL: {
        type: String,
        default: "/images/default.jpg"
    },
    role: {
        type: String,
        enum: ['teacher','admin'], //can't be anything other than these two values
        default: 'teacher'
    }
},
{timestamp:true}
)

teacherSchema.pre('save', function (next) {
    const teacher = this;
    if (!teacher.isModified('password')) return;
    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256', salt).update(teacher.password).digest("hex"); //create hashedPassword 
    this.salt = salt;                                               
    this.password = hashedPassword;
    next();
})
teacherSchema.static("matchPasswordAndGenerateTokenTeacher", async function (faculty_id, password) {
    const teacher = await this.findOne({ faculty_id });
    if (!teacher) throw new Error("teacher Not Found");
    const salt = teacher.salt;
    const hashedPassword = teacher.password;

    const providedPassword = createHmac('sha256', salt)  //create hashedPassword again
        .update(password)
        .digest("hex");
    if (hashedPassword !== providedPassword) 
        throw new Error("Incorrect Password")

    const token = createTokenForTeacher(teacher)
    return token;
})
const Teacher = mongoose.model('teacher',teacherSchema);

module.exports = Teacher;