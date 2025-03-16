const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const studentSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        unique: true
    },
    prn: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student'],
        default: 'student'
    }
},
    { timestamps: true }
)

studentSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
})

studentSchema.method("matchPassword", async function (password) {
    return await bcrypt.compare(password, this.password);
})

const Student = mongoose.model('student', studentSchema);
module.exports = Student;