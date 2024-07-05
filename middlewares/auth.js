const { validateToken } = require("../services/auth")

checkCookieForAuthenticationStudent=(cookieName)=>{
    return (req,res,next)=>{
        const tokenCookieValue = req.cookies[cookieName];
        if(!tokenCookieValue)  return next();
        try {
            const studentPayload = validateToken(tokenCookieValue);
            req.student = studentPayload;             // here EVERYHTING realted to student IS DEFINED
            // console.log(req.student);
            return next(); 
        } catch (error) {
            console.log("checkCookieForAuthenticationStudent Error here",error);
            return res.redirect('/student/signin')
        }
    }
}
checkCookieForAuthenticationTeacher=(cookieName)=>{
    return (req,res,next)=>{
        const tokenCookieValue = req.cookies[cookieName]
        if(!tokenCookieValue)  return next();
        try {
            const teacherPayload = validateToken(tokenCookieValue);
            req.teacher = teacherPayload;             // here EVERYHTING realted to teacher IS DEFINED
            return next(); 
        } catch (error) {
            console.log("checkCookieForAuthenticationTeacher Error here",error);
            return res.redirect('/teacher/signin')
        }  
    }
}
module.exports= {checkCookieForAuthenticationStudent , checkCookieForAuthenticationTeacher}