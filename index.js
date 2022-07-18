require("dotenv").config({path: "./config.env"});
const mongoose = require("mongoose")
const connectDB = require("./config/db");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/users");
const path = require("path");

connectDB();
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
  });
}
else {
  app.get('/', (req,res) => {
    res.send('APP IS RUNNING.');
  })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));