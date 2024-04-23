const jwt = require('jsonwebtoken');

const secret = 'anand6969';

createTokenForStudent=(student)=>{
    const payload = {       
    _id:student.id,
    prn:student.prn,
    profileImageURL: student.profileImageURL,
    fullname:student.fullname,
    role:student.role,
    }
    const token = jwt.sign(payload,secret);   //sign(payload/data,secret key)
    return token;
}
createTokenForTeacher = (teacher)=>{
    let payload = {
        _id:teacher.id,
        subject:teacher.subject,
        faculty_id:teacher.faculty_id,
        profileImageURL: teacher.profileImageURL,
        fullname:teacher.fullname,
        role:teacher.role,
    }
    const token = jwt.sign(payload,secret);   //sign(payload/data,secret key)
    return token;
}
validateToken = (token)=>{
    const payload = jwt.verify(token,secret);
    return payload;
}
module.exports = {createTokenForStudent,validateToken,createTokenForTeacher};