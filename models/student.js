const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name        : {type: String, required: true},
    email       : {type: String, required: true},
    username    : {type: String, required: true},
    password    : {type: String, required: true},
    phone       : {type: String, required: true},
    faculty     : {type: String, required: true},
    program     : {type: String, required: true},
    sex         : {type: String, required: true},
    yearofstudy : {type: Number, required: true}
}, { 
    timestamps: true, 
    versionKey: false 
});
const student = mongoose.model('Student', studentSchema); 
module.exports = student