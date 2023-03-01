const express = require('express');
const router = express.Router();
const Prescription = require("./models/prescription")


router.post('/make_prescription', (req, res, next) => {
    try {
        let prescription = new Prescription({
            cita_id: req.body.cita_id,
            user_id: req.body.user_id,
            doctor_id: req.body.doctor_id,
            doctor_name: req.body.doctor_name,
            doctor_last_name: req.body.doctor_last_name,
            user_name: req.body.user_name,
            user_last_name: req.body.user_last_name,
            date: req.body.date,
            notes: req.body.notes,

        });
        prescription.save();
        res.status(201).send();
    } catch (err) {
        console.log(err);
    }
});

router.put('/edit_prescription', (req, res, next) => {
    try {
        Prescription
            .findOneAndUpdate({cita_id: req.body.cita_id}, { notes: req.body.notes})
            .then(()=>{ res.status(201).send();})
            .catch((err)=>{console.log(err)})
       
    } catch (err) {
        console.log(err);
    }
});

router.get('/get_prescription_by_cita_id', (req, res, next) => {
    try {
        Prescription
            .findOne({cita_id: req.query.cita_id})
            .then((data)=>{ 
                res.status(201).send(data.notes); 
            })
            .catch((err)=>{console.log(err)})
       
    } catch (err) {
        console.log(err);
    }
});

router.get('/get_prescription_by_cita_id_l', (req, res, next) => {
    try {
        Prescription
            .findOne({cita_id: req.query.cita_id})
            .then((data)=>{ 
                res.status(201).send(data); 
            })
            .catch((err)=>{console.log(err)})
       
    } catch (err) {
        console.log(err);
    }
});


module.exports = router;
