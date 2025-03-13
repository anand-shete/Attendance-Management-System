const mongoose = require('mongoose');

const qrcodeSchema = new mongoose.Schema({
    teacherName: {
        type: String,
    },
    teacherSubject: {
        type: String,
    },
    qrCodeURL: {
        type: String,
    },
    createdByTeacher: {
        type: mongoose.Types.ObjectId,
        ref: "teacher"
    },
    markedByStudents: [{
        _id: false,
        student: {
            type: mongoose.Types.ObjectId,
            ref: "student",
        },
        scanTime: {
            type: Date,
            default: new Date()
        }
    }]
},
    { timestamps: true }
)

const Qrcode = mongoose.model('qrcode', qrcodeSchema);
module.exports = Qrcode;