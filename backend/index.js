const cors = require('cors')
const express = require('express');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const staticRoute = require('./routes/staticRoute');
const studentRoute = require('./routes/studentRoute');
const teacherRoute = require('./routes/teacherRoute');
const adminRoute = require('./routes/admin');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

(async () => {
    await connectDB();

    const frontendUrl1 = process.env.FRONTEND_URL1;
    const frontendUrl2 = process.env.FRONTEND_URL2;
    const frontendUrl3 = process.env.FRONTEND_URL3;
    if (!frontendUrl1 && process.env.NODE_ENV === 'production') {
        console.error('FRONTEND_URL is not set in production!');
        process.exit(1);
    }

    app.use(cors({
        origin: [frontendUrl1, frontendUrl2, frontendUrl3],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }));

    app.use(express.urlencoded({ extended: false }))
    app.use(express.json())
    app.use(cookieParser());

    app.use('/api', staticRoute);
    app.use('/api/admin', adminRoute);
    app.use('/api/student', studentRoute);
    app.use('/api/teacher', teacherRoute);

    app.listen(PORT, () => console.log(`Server Started on PORT:${PORT}`))
})()
