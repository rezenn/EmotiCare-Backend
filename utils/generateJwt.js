const jwt = require("jsonwebtoken");
require('dotenv').config();

function jwtGenerator(user_id) {
    const payLoad = {
        user: user_id
    }

    return jwt.sign(payLoad, process.env.SECRET, { expiresIn: "24hr" })
}

module.exports = jwtGenerator;