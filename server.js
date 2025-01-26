const { config } = require('dotenv')
config()

const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());

// middleware
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

//routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/moodTracker", require("./routes/trackerRoutes"));
app.use("/note", require("./routes/noteRoutes"));
app.use('/challenge', require("./routes/ChallengeRoutes"));

app.listen(PORT, () => {
    console.log("The app is running at port: " + PORT);
});