const express = require('express');
const router = express.Router();

router.get('/',(req, res) => {
    res.clearCookie('teacherToken').clearCookie('StudentToken').render('home');
    // res.render('home');
})
module.exports = router;