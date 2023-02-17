const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    password: { type: String },
    address: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    name: { type: String },
    lastName: { type: String },
    role: {
        type: String,
        enum: ['doctor', 'patient', 'admin'],
    },
    doctor: {
        position: { type: String },
        schedule: {
            Monday: [Number],
            Tuesday: [Number],
            Wednesday: [Number],
            Thursday: [Number],
            Friday: [Number],
            Saturday: [Number],
        },
        patients: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    },
    patient: {
        doctor: { type: Schema.Types.ObjectId, ref: 'User' },
        doctor_name: { type: String },
        doctor_last_name: { type: String },
    },
    admin: {},
});

module.exports = mongoose.model('User', UserSchema);
