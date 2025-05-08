const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const teacherSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        unique: true
    },
    faculty_id: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['teacher', 'admin'], 
        default: 'teacher'
    }
}, { timestamps: true })

teacherSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword;
    next();
})

teacherSchema.method("matchPassword", async function (password) {
    return await bcrypt.compare(password, this.password);
})

const Teacher = mongoose.model('teacher', teacherSchema);
module.exports = Teacher;