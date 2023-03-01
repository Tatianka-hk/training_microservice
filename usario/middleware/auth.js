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
    if (!accessToken || accessToken == undefined) {
        return res.status(200).send({ mes: 'no' });
    }
    try {
        const validToken = verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        req.user = validToken;
        if (validToken) {
            return next();
        } else {
            return res.status(200).send({ mes: 'no' });
        }
    } catch (err) {
        return res.status(200).send({ mes: 'no' });
    }
};

module.exports = { validateToken, change_password };
