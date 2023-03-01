const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PrescriptionSchema = new Schema({
    cita_id: {
        type: String,
    },
    doctor_id: {
        type: String,
    },
    user_id: {
        type: String,
    },
    user_name: {
        type: String,
    },
    user_last_name: {
        type: String,
    },
    doctor_name: {
        type: String,
    },
    doctor_last_name: {
        type: String,
    },
    notes: {
        type: String,
    },
    date: {
        type: Date,
    },
});

module.exports = mongoose.model('Prescription', PrescriptionSchema);
