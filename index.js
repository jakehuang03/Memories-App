require("dotenv").config({path: "./config.env"});
const mongoose = require("mongoose")
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/users");
const path = require("path");


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

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);
