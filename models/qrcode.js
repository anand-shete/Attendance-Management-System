const mongoose = require('mongoose');

const qrcodeSchema = new mongoose.Schema({
    createdByTeacher:[{
        teacher:{
            type: mongoose.Types.ObjectId, 
            ref: "teacher" 
        },
        date:{
            type:Date,
            default:new Date(),
        }
    }],
    teacherName:{
        type:String,
    },
    teacherSubject:{
        type:String,
        ref:"teacher"
    },
    qrCodeURL : {
        type:String,
    },
    markedByStudent: [{      //Array of Objets
        student:{
            type: mongoose.Types.ObjectId, 
            ref: "student" 
        },
        scanTime:{
            type:Date,
            default:new Date()
        }
    }]
}, 
{
        timestamps:true
}
)

const Qrcode = mongoose.model('qrcode',qrcodeSchema);

module.exports = Qrcode;