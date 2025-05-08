const jwt = require('jsonwebtoken');
require("dotenv").config();
const secret = process.env.JWT_SECRET_KEY

const generateTokenForStudent = (student) => {
    const payload = {
        _id: student.id,
        fullname: student.fullname,
        prn: student.prn,
        role: student.role,
    }
    return jwt.sign(payload, secret, { expiresIn: '1h' });
}

const generateTokenForTeacher = (teacher) => {
    let payload = {
        _id: teacher.id,
        fullname: teacher.fullname,
        subject: teacher.subject,
        faculty_id: teacher.faculty_id,
        role: teacher.role,
    }
    return jwt.sign(payload, secret, { expiresIn: '1h' });
}

const verifyToken = (token) => {
    return jwt.verify(token, secret);
}
module.exports = { generateTokenForStudent, verifyToken, generateTokenForTeacher };