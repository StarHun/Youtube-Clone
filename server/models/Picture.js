const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pictureSchema = mongoose.Schema({

    writer: {
            type: Schema.Types.ObjectId,
            ref:'User'
    },
    title: {
        type:String,
        maxlength: 50
    },
    description: {
        type:String
    },
    privacy: {
        type:Number
    },
    filepath: {
        type:String
    },
    catogory: {
        tpye:String
    },
    views : {
        type: Number,
        default: 0 
    },
    duration :{
        type: String
    },
    thumbnail: {
        type: String
    }

}, { timestamps: true } ) 



const Picture = mongoose.model('Picture', pictureSchema);

module.exports = { Picture }