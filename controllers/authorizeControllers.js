const bcrypt = require("bcrypt");
const generateJwt = require("../utils/generateJwt");
const User = require("../model/UserModel");


const registerUsers = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const Userexists = await User.findByEmail(email);

        if (Userexists) {
            return res.status(401).send("Email id already exists.");

        }
        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name, email, password: bcryptPassword
        });
        const token = generateJwt(newUser.user_id);

        return res.json({ token });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error in server");
    }

};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json("User not found");
        }
        const validPassword = await bcrypt.compare(password, user.user_password);
        if (!validPassword) {
            return res.status(401).json("Invalid credentials");
        }
        const token = generateJwt(user.user_id);
        return res.json({ token });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error in server");
    }
}

const forgotPassword = async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json("User not found");
        }

        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(newPassword, salt); 

        const updatedUser = await User.updatePassword({ email, password: bcryptPassword });

        if (!updatedUser) {
            return res.status(500).json("Failed to update password");
        }
        return res.status(200).json("Password updated successfully");
    } catch (error) {
        console.error("Error in forgotPassword:", error.message);
        res.status(500).json("Internal Server Error");
    }
};

const verifyUser = async (req, res) => {
    try {
        res.json(true);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error in server");
    }

}

module.exports = { registerUsers, loginUser, forgotPassword, verifyUser }