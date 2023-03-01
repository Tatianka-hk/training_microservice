const express = require('express');
const router = express.Router();
const User = require('./models/user');
const jwt = require('jsonwebtoken');
const { validateToken, change_password } = require('./middleware/auth');

router.post('/register', (req, res) => {
    try {
        let pas = change_password(req.body.password);
        let user = new User({
            name: req.body.name,
            lastName: req.body.last_name,
            address: req.body.adress,
            email: req.body.email,
            phoneNumber: req.body.phone_number,
            role: 'patient',
            patient: {
                doctor: req.body.doctor,
                doctor_name: req.body.doctor_name,
                doctor_last_name: req.body.doctor_last_name,
            },

            password: pas,
        });
        user.save();
        let usario = {
            id: req.body._id,
            name: req.body.name,
            lastName: req.body.last_name,
            role: 'patient',
            doctor: req.body.doctor,
        };
        let a_t = jwt.sign(usario, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '4h',
        });
        res.status(200).send({ token: a_t });
    } catch (err) {
        console.log(err);
    }
});
router.post('/login', (req, res) => {
    try {
        let pas = change_password(req.body.password);
        User.findOne({
            name: req.body.name,
            lastName: req.body.last_name,
            password: pas,
        })
            .then((data) => {
                if (data == null) {
                    res.status(200).send('no compare');
                } else {
                    let usario = {
                        id: data._id,
                        name: req.body.name,
                        lastName: req.body.last_name,
                        role: data.role,
                        doctor: data.doctor,
                    };
                    let a_t = jwt.sign(usario, process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: '4h',
                    });
                    res.status(200).send({ token: a_t, role: data.role });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    } catch (err) {
        console.log(err);
    }
});
router.get('/validate_user', validateToken, (req, res) => {
    try {
        res.status(200).send({ role: req.user.role });
    } catch (err) {
        console.log(err);
    }
});

router.get('/personal_page', validateToken, (req, res) => {
    try {
        if (req.user.role != 'patient') {
            res.status(404).send({ role: req.user.role });
        } else {
            User.findOne({
                name: req.user.name,
                lastName: req.user.lastName,
                role: req.user.role,
            })
                .then((data) => {
                    let user = {
                        name: req.user.name,
                        lastName: req.user.lastName,
                        role: req.user.role,
                        doctor: req.user.doctor,
                        email: data.email,
                        phone: data.phoneNumber,
                        address: data.address,
                        id: data._id,
                    };
                    User.findById(data.patient.doctor).then((udoctor) => {
                        if (udoctor != null) {
                            let doctor = {
                                id: udoctor._id,
                                name: udoctor.name,
                                lastName: udoctor.lastName,
                                email: udoctor.email,
                                phone: udoctor.phoneNumber,
                                schedule: udoctor.doctor.schedule,
                            };
                            res
                                .status(200)
                                .send({ user: user, doctor: doctor, role: req.user.role });
                        }
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    } catch (err) {
        console.log(err);
    }
});

router.post('/change', validateToken, (req, res) => {
    try {
        if (req.body.att == 'lastName') {
            User.findOneAndUpdate(
                {
                    name: req.user.name,
                    lastName: req.user.lastName,
                    role: req.user.role,
                },
                { lastName: req.body.value }
            )
                .then((data) => {
                    let usario = {
                        name: req.user.name,
                        lastName: req.body.value,
                        role: data.role,
                        doctor: data.doctor,
                    };
                    let a_t = jwt.sign(usario, process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: '1h',
                    });
                    res.status(200).send({ token: a_t, role: data.role });
                })
                .catch((err) => {
                    console.log(err);
                });
        } else if (req.body.att == 'phoneNumber') {
            User.findOneAndUpdate(
                {
                    name: req.user.name,
                    lastName: req.user.lastName,
                    role: req.user.role,
                },
                { phoneNumber: req.body.value }
            )
                .then((data) => {
                    res.status(200).send({ token: 'no', role: data.role });
                })
                .catch((err) => {
                    console.log(err);
                });
        } else if (req.body.att == 'address') {
            User.findOneAndUpdate(
                {
                    name: req.user.name,
                    lastName: req.user.lastName,
                    role: req.user.role,
                },
                { address: req.body.value }
            )
                .then((data) => {
                    res.status(200).send({ token: 'no', role: data.role });
                })
                .catch((err) => {
                    console.log(err);
                });
        } else if (req.body.att == 'email') {
            User.findOneAndUpdate(
                {
                    name: req.user.name,
                    lastName: req.user.lastName,
                    role: req.user.role,
                },
                { email: req.body.value }
            )
                .then((data) => {
                    res.status(200).send({ token: 'no', role: data.role });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    } catch (err) {
        console.log(err);
    }
});

router.delete('/delete', validateToken, (req, res) => {
    try {
        User.findOneAndDelete({
            name: req.user.name,
            lastName: req.user.lastName,
            role: req.user.role,
        })
            .then((data) => {
                console.log('deleted');
            })
            .catch((err) => console.log(err));
    } catch (err) {
        console.log(err);
    }
});
router.post('/add_admin', (req, res, next) => {
    try {
        let pas = change_password(req.body.password);

        let user = new User({
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            role: 'admin',
            password: pas,
        });
        user.save();
        res.status(200).send('ok');
    } catch (err) {
        console.log(err);
    }
});

router.post('/add_doctor', (req, res, next) => {
    try {
        let pas = change_password(req.body.password);
        let user = new User({
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            role: 'doctor',
            password: pas,
            doctor: {
                position: req.body.position,
                schedule: req.body.schedule,
            },
        });
        user.save();
        res.status(200).send('ok');
    } catch (err) {
        console.log(err);
    }
});

router.get('/doctors', validateToken, (req, res, next) => {
    try {
        if (req.user.role != 'admin') {
            res.status(200).send({ role: req.user.role });
        } else {
            User.find({ role: 'doctor' })
                .then((data) => {
                    res.status(200).send({ user: data, role: req.user.role });
                })
                .catch((err) => console.log(err));
        }
    } catch (err) {
        console.log(err);
    }
});

router.get('/doctors_list', (req, res, next) => {
    try {
        User.find({ role: 'doctor' })
            .then((data) => {
                res.status(200).send(data);
            })
            .catch((err) => console.log(err));
    } catch (err) {
        console.log(err);
    }
});
router.get('/doctors_list2', validateToken, (req, res) => {
    try {
        if (req.user.role != 'patient') {
            res.status(200).send({ role: req.user.role });
        } else {
            User.find({ role: 'doctor' })
                .then((data) => {
                    res.status(200).send(data);
                })
                .catch((err) => console.log(err));
        }
    } catch (err) {
        console.log(err);
    }
});

router.get('/doctor', validateToken, (req, res) => {
    try {
        if (req.user.role != 'admin') {
            res.status(200).send({ role: req.user.role });
        } else {
            User.findById(req.query.id)
                .then((data) => {
                    res.status(200).send({ user: data, role: req.user.role });
                })
                .catch((err) => console.log(err));
        }
    } catch (err) {
        console.log(err);
    }
});

router.get('/acc_doctor', (req, res) => {
    try {
        User.findById(req.query.id)
            .then((data) => {
                console.log(data);
                res.status(200).send(data);
            })
            .catch((err) => console.log(err));
    } catch (err) {
        console.log(err);
    }
});

router.post('/edit_doctor', validateToken, (req, res) => {
    try {
        User.findByIdAndUpdate(req.body.id, {
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            doctor: {
                position: req.body.position,
                schedule: req.body.schedule,
            },
        })
            .then((data) => {
                res.status(200).send(data);
            })
            .catch((err) => console.log(err));
    } catch (err) {
        console.log(err);
    }
});

router.put('/change_doctor', validateToken, (req, res) => {
    try {
        User.findByIdAndUpdate(req.body.id, {
            patient: {
                doctor: req.body.doctor,
                doctor_name: req.body.doctor_name,
                doctor_last_name: req.body.doctor_last_name,
            },
        })
            .then((data) => {
                res.status(200).send(data);
            })
            .catch((err) => console.log(err));
    } catch (err) {
        console.log(err);
    }
});

router.delete('/delete_doctor', (req, res) => {
    try {
        User.findByIdAndDelete(req.body.id)
            .then((data) => {
                res.status(200).send();
            })
            .catch((err) => console.log(err));
    } catch (err) {
        console.log(err);
    }
});

router.get('/get_users', validateToken, (req, res, next) => {
    try {
        if (req.user.role != 'admin') {
            res.status(200).send({ role: req.user.role });
        } else {
            User.find({ role: 'patient' })
                .then((data) => {
                    res.status(200).send({ user: data, role: req.user.role });
                })
                .catch((err) => console.log(err));
        }
    } catch (err) {
        console.log(err);
    }
});

router.get('/get_doctor_pacientos', validateToken, (req, res, next) => {
    try {
        if (req.user.role != 'doctor') {
            res.status(200).send({ role: req.user.role });
        }
        User.find({ role: 'patient', 'patient.doctor': req.user.id })
            .then((data) => {
                res.status(200).send({ user: data, role: req.user.role });
            })
            .catch((err) => console.log(err));
    } catch (err) {
        console.log(err);
    }
});

router.get('/get_user', validateToken, (req, res, next) => {
    try {
        if (req.user.role != 'admin') {
            res.status(200).send({ role: req.user.role });
        }
        User.findById(req.query.id)
            .then((data) => {
                let user = {
                    name: data.name,
                    lastName: data.lastName,
                    role: data.role,
                    doctor: data.patient.doctor,
                    email: data.email,
                    phone: data.phoneNumber,
                    address: data.address,
                };
                User.find({ role: 'doctor' }).then((udoctor) => {
                    res
                        .status(200)
                        .send({ user: user, doctor: udoctor, role: req.user.role });
                });
            })
            .catch((err) => {
                console.log(err);
            });
    } catch (err) {
        console.log(err);
    }
});

router.post('/edit_user', validateToken, (req, res) => {
    try {
        User.findByIdAndUpdate(req.body.id, {
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            patient: {
                doctor: req.body.doctor,
                doctor_name: req.body.doctor_name,
                doctor_last_name: req.body.doctor_last_name,
            },
        })
            .then((data) => {
                res.status(200).send(data);
            })
            .catch((err) => console.log(err));
    } catch (err) {
        console.log(err);
    }
});
module.exports = router;

router.get('/personal_admin', validateToken, (req, res) => {
    try {
        if (req.user.role != 'admin') {
            res.status(200).send({ role: req.user.role });
        } else {
            User.findOne({
                name: req.user.name,
                lastName: req.user.lastName,
                role: req.user.role,
            })
                .then((data) => {
                    res.status(200).send({
                        name: req.user.name,
                        lastName: req.user.lastName,
                        role: req.user.role,
                        doctor: req.user.doctor,
                        email: data.email,
                        phone: data.phoneNumber,
                        address: data.address,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    } catch (err) {
        console.log(err);
    }
});
module.exports = router;

router.get('/personal_doctor', validateToken, (req, res) => {
    try {
        if (req.user.role != 'doctor') {
            res.status(200).send({
                role: req.user.role,
            });
        }
        User.findOne({
            name: req.user.name,
            lastName: req.user.lastName,
            role: req.user.role,
            // doctor: req.user.doctor,
        })
            .then((data) => {
                res.status(200).send({
                    name: req.user.name,
                    lastName: req.user.lastName,
                    role: req.user.role,
                    doctor: req.user.doctor,
                    email: data.email,
                    phone: data.phoneNumber,
                    schedule: data.doctor.schedule,
                    id: data._id,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    } catch (err) {
        console.log(err);
    }
});
module.exports = router;
