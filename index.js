require("dotenv").config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 8000 || process.env.PORT;
const path = require('path');
const cookieParser = require('cookie-parser')
const staticRoute=  require('./routes/staticRoute');
const studentRoute = require('./routes/studentRoute');
const teacherRoute=  require('./routes/teacherRoute');
const adminRoute=  require('./routes/admin');
const { checkCookieForAuthenticationStudent ,checkCookieForAuthenticationTeacher } = require('./middlewares/auth');

mongoose.connect(process.env.MONGO_URL).then(()=>console.log("Db connected")).catch((e)=>console.log("Db error",e));

app.use(express.urlencoded({extended:false}))
app.use(cookieParser());
app.use(express.static(path.resolve('./public'))) 

app.set('view engine', 'ejs');
app.set('views','./views');

app.use('/',staticRoute);
app.use('/admin',adminRoute);
app.use('/student',checkCookieForAuthenticationStudent('StudentToken'),studentRoute);
app.use('/teacher',checkCookieForAuthenticationTeacher('teacherToken'),teacherRoute);

app.listen(PORT, () => console.log("Server Started! ON PORT:",PORT))     