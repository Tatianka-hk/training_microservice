const express = require('express');
const router = express.Router();
const Prescription = require("./models/prescription")


router.post('/make_prescription', (req, res, next) => {
    try {
        console.log('register');
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
        console.log(prescription);
        prescription.save();
        res.status(201).send();
    } catch (err) {
        console.log(err);
    }
});

router.put('/edit_prescription', (req, res, next) => {
    try {
        console.log('register');
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
        console.log('register ', req.query.cita_id);
        Prescription
        .find()
        .then((data)=>{ 
            
            console.log(data)
        })
        .catch((err)=>{console.log(err)})
        Prescription
            .findOne({cita_id: req.query.cita_id})
            .then((data)=>{ 
                
                console.log(data)
                // if (data!= null){
                    console.log(data["notes"])  
                    console.log(data.notes)  
                    console.log(data.user_name)
                    res.status(201).send(data.notes); 
               
                // }
            })
            .catch((err)=>{console.log(err)})
       
    } catch (err) {
        console.log(err);
    }
});

router.get('/get_prescription_by_cita_id_l', (req, res, next) => {
    try {
        console.log('register ', req.query.cita_id);
        Prescription
        .find()
        .then((data)=>{ 
            
            console.log(data)
        })
        .catch((err)=>{console.log(err)})
        Prescription
            .findOne({cita_id: req.query.cita_id})
            .then((data)=>{ 
                
                console.log(data)
                // if (data!= null){
                    console.log(data["notes"])  
                    console.log(data.notes)  
                    console.log(data.user_name)
                    res.status(201).send(data); 
               
                // }
            })
            .catch((err)=>{console.log(err)})
       
    } catch (err) {
        console.log(err);
    }
});


module.exports = router;
