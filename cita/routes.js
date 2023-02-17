const express = require('express');
const router = express.Router();
const Cita = require('./models/cita');
router.post('/make_app', (req, res) => {
    console.log('make cita');
    try {
        let ndata = new Date(req.body.year, req.body.month - 1, req.body.day);
        let cita = new Cita({
            user_id: req.body.p_id,
            doctor_id: req.body.d_id,
            hour: req.body.hour,
            day_of_week: req.body.w_day,
            day: req.body.day,
            month: req.body.month,
            year: req.body.year,
            data: ndata,
            p_name: req.body.p_name,
            p_lastName: req.body.p_lastName,
        });
        cita.save();
        console.log('saved');
    } catch (err) {
        console.log(err);
    }
});

router.get('/get_apps_in_2_weeks', (req, res) => {
    console.log('get cita');

    try {
        let ndata = new Date();
        ndata.setDate(ndata.getDate() + 15);
        console.log(req.query.d_id);

        Cita.find({ doctor_id: req.query.d_id, data: { $lt: ndata } })
            .then((data) => {
                console.log(data);
                res.status(200).send(data);
            })
            .catch((err) => {
                console.log(err);
            });
    } catch (err) {
        console.log(err);
    }
});

router.get('/get_cita_in_2_week', (req, res) => {
    console.log('get cita de usario');

    try {
        let ndata = new Date();
        ndata.setDate(ndata.getDate() - 1);
        console.log(req.query);

        Cita.findOne({ user_id: req.query.id, data: { $gt: ndata } })
            .then((data) => {
                console.log(data);
                res.status(200).send({cita:data, prescription:data.prescription});
            })
            .catch((err) => {
                console.log(err);
            });
    } catch (err) {
        console.log(err);
    }
});

router.delete('/delete_app', (req, res) => {
    console.log('get cita de usario');

    try {
        Cita.findByIdAndDelete({ _id: req.query.c_id })
            .then((data) => {
                console.log('deleted');
                res.status(200).send();
            })
            .catch((err) => {
                console.log(err);
            });
    } catch (err) {
        console.log(err);
    }
});
router.put('/change_app', (req, res) => {
    console.log('get cita de usario');

    try {
        let ndata = new Date(req.body.year, req.body.month - 1, req.body.day);
        Cita.findByIdAndUpdate(req.body.id, {
            hour: req.body.hour,
            day_of_week: req.body.w_day,
            day: req.body.day,
            month: req.body.month,
            year: req.body.year,
            data: ndata,
        })
            .then((data) => {
                console.log('changed');
                res.status(200).send();
            })
            .catch((err) => {
                console.log(err);
            });
    } catch (err) {
        console.log(err);
    }
});

router.get('/get_today', (req, res) => {
    console.log('get cita');

    try {
        console.log(req.query.day);
        console.log(req.query.month);
        console.log(req.query.year);
        console.log(req.query.id);
        Cita.find({
            doctor_id: req.query.id,
            day: req.query.day,
            month: req.query.month,
            year: req.query.year,
        })
            .then((data) => {
                console.log(data);
                res.status(200).send(data);
            })
            .catch((err) => {
                console.log(err);
            });
    } catch (err) {
        console.log(err);
    }
});

router.get('/get_citas', (req, res) => {
    console.log('get cita');

    try {
        console.log(req.query.id);
        Cita.find({ doctor_id: req.query.id })
            .then((data) => {
                console.log(data);
                res.status(200).send(data);
            })
            .catch((err) => {
                console.log(err);
            });
    } catch (err) {
        console.log(err);
    }
});
router.get('/get_patient_citas', (req, res) => {
    console.log('get cita');

    try {
        console.log(req.query.id);
        Cita.find({ user_id: req.query.id }).sort({data: 1})
            .then((data) => {
                console.log(data);
                res.status(200).send(data);
            })
            .catch((err) => {
                console.log(err);
            });
    } catch (err) {
        console.log(err);
    }
});

router.put('/maked_prescription', (req, res) => {
    console.log('get cita de usario');

    try {
        Cita.findByIdAndUpdate(req.body.cita_id, {
            prescription:true
        })
            .then((data) => {
                console.log('changed');
                res.status(200).send();
            })
            .catch((err) => {
                console.log(err);
            });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
