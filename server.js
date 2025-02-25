const { config } = require('dotenv')
config()

const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors');

app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
 
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use("/auth", require("./routes/AuthRoutes"));
app.use("/profile", require("./routes/UserRoutes"));
app.use("/moodTracker", require("./routes/TrackerRoutes"));
app.use("/note", require("./routes/NoteRoutes"));
app.use('/challenge', require("./routes/ChallengeRoutes"));
app.use('/dailyJournal', require("./routes/DailyjournalRoutes"));


app.listen(PORT, () => {
    console.log("The app is running at port: " + PORT);
});


