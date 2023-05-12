const mongoose = require ('mongoose');

const feedbackSchema = mongoose.Schema({

    name : {
        type : String,
        required: true
    },
    date : {
        type : String,
        required: true
    },
    discription : {
        type : String,
        required: true
    }

});

const Feedback = mongoose.model('Feedback',feedbackSchema);
module.exports = Feedback;