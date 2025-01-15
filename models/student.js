const mongoose = require('mongoose');
const { createHmac, randomBytes } = require('crypto');
const {createTokenForStudent} = require('../services/auth');

const studentSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required:true,
        unique:true
    },
    prn: {
        type: String,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required:true
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
        enum: ['student'], //can't be anything other than these two values
        default: 'student'
    }
},
{timestamp:true}
)
studentSchema.pre('save', function (next) {
    const student = this;
    if (!student.isModified('password')) return;
    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256', salt).update(student.password).digest("hex"); //create hashedPassword 
    // console.log(this.salt);
    this.salt = salt;                                               
    this.password = hashedPassword;
    next();
})
studentSchema.static("matchPasswordAndGenerateTokenStudent", async function (prn, password) {
    const student = await this.findOne({ prn });
    if (!student) throw new Error("Student Not Found");
    const salt = student.salt;  
    const hashedPassword = student.password;

    const providedPassword = createHmac('sha256', salt)  //create hashedPassword again
        .update(password)
        .digest("hex");
    if (hashedPassword !== providedPassword) 
        throw new Error("Incorrect Password")
    const token = createTokenForStudent(student)
    return token;
})
const Student = mongoose.model('student', studentSchema);

module.exports = Student;