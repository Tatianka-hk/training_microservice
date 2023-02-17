var sha256 = require('sha256');
const { verify } = require('jsonwebtoken');

//coding password by sha2 and salt
function change_password(user_password) {
    var pass = process.env.salt;
    pass += user_password;
    return sha256(pass);
}

const validateToken = (req, res, next) => {
    const accessToken = req.header('accessToken');
    console.log(req.params.id);
    console.log(accessToken);

    if (!accessToken) return res.status(404).send({ mes: 'no' });
    console.log('validate');

    try {
        const validToken = verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        req.user = validToken;
        console.log('validate');
        if (validToken) {
            console.log('USER TOKEN');
            return next();
        } else {
            console.log('NONONONON TOKEN');
            return res.res.status(404).send({ mes: 'no' });
        }
    } catch (err) {
        console.log(err);
    // return res.send({ error: err });
    }
};

module.exports = { validateToken, change_password };
