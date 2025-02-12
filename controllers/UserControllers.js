const User = require("../model/UserModel");
const { getUserById, Mood } = require("../model/TrackerModel");

const userController = {
    async getUserEmail(req, res)  {
        try {
            const user = await getUserById(req.user);
            if (!user) return res.status(404).json({ error: "User not found." });
    
            const moods = await Mood.getMoodByUser(req.user);
            res.status(200).json({ 
                user_email: user.user_email, 
                moods 
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: "Failed to retrieve user info." });
        }
    },
    async getProfile(req, res) {
        try {
            const { email } = req.params;
            const user = await User.getProfile({ email });
            
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const { user_password, ...userProfile } = user;
            res.status(200).json(userProfile);

        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: "Failed to get user profile" });
        }
    },

    async updateProfile(req, res) {
        try {
          const { email } = req.params;
          const { user_name, full_name, birthday, gender } = req.body;
          const profile_picture_url = req.file ? `/uploads/${req.file.filename}` : null;
      
          // Ensure the date is in YYYY-MM-DD format
          const formattedBirthday = new Date(birthday).toISOString().split('T')[0];
      
          const updatedUser = await User.updateProfile({
            user_name,
            full_name,
            birthday: formattedBirthday,
            gender,
            profile_picture_url,
            email,
          });
      
          if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
          }
      
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