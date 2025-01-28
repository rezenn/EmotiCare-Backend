const User = require("../model/UserModel");

const userController = {
    async getProfile(req, res) {
        try {
            const { email } = req.params;
            const user = await User.getProfile({ email });
            
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Remove password if it somehow gets included
            const { user_password, ...userProfile } = user;
            res.status(200).json(userProfile);
            console.log("Fetched User:", user);

        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: "Failed to get user profile" });
        }
    },

    async updateProfile(req, res) {
        try {
            const { email } = req.params;
            const { user_name, full_name, birthday, gender, profile_picture_url } = req.body;
    
            const updatedUser = await User.updateProfile({
                user_name,
                full_name,
                birthday,
                gender,
                profile_picture_url,
                email,
            });
    
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }
    
            // Respond with sanitized user data
            res.status(200).json({
                message: "Profile updated successfully",
                user: updatedUser,
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: "Failed to update profile" });
        }
    },
    
};

module.exports = userController; 