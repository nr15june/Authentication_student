const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    stskill: { type: String },
    stability: { type: String },
    stworktime: { type: String },
},
{timestamps: true, versionKey: false}

);

const post = mongoose.model('Post', postSchema);
module.exports = post