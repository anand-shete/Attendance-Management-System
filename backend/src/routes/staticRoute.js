const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.clearCookie('teacherToken').clearCookie('studentToken').status(200).end();
})
module.exports = router;