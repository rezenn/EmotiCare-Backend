const generateJwt = require("../utils/generateJwt");
const { getUserById } = require("../model/trackerModel");

const getUserInfo = async (req, res) => {
    try {

        const user = await getUserById(req.user);

        if (!user) {
            return res.status(404).json("User not found.")
        }

        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server error")

    }
}

module.exports = { getUserInfo };