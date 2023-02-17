const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CitaSchema = new Schema({
    user_id: {
        type: String,
    },
    doctor_id: {
        type: String,
    },
    p_name: {
        type: String,
    },
    p_lastName: {
        type: String,
    },
    hour: {
        type: String,
    },
    day_of_week: {
        type: String,
    },
    day: {
        type: Number,
    },
    month: {
        type: String,
    },

    year: {
        type: Number,
    },
    data: {
        type: Date,
    },
    prescription:{
        type:Boolean,
        default:false
    }
});

module.exports = mongoose.model('Cita', CitaSchema);
