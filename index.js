const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const staticRoute = require('./routes/staticRoute');
const studentRoute = require('./routes/studentRoute');
const teacherRoute = require('./routes/teacherRoute');
const adminRoute = require('./routes/admin');
const { checkCookieForAuthenticationStudent, checkCookieForAuthenticationTeacher } = require('./middlewares/auth');

require("dotenv").config();

const app = express();
const PORT = 8000 || process.env.PORT;
mongoose.connect(process.env.MONGO_URL).then(() => console.log("Db connected")).catch((e) => console.log("Db error", e));

app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(express.static(path.resolve('./public')))       // static files path

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', staticRoute);
app.use('/admin', adminRoute);
app.use('/student', checkCookieForAuthenticationStudent('StudentToken'), studentRoute);
app.use('/teacher', checkCookieForAuthenticationTeacher('teacherToken'), teacherRoute);

app.listen(PORT, () => console.log("Server Started on PORT:", PORT))     