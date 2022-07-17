const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        mongoose.set("useFindAndModify", false);
        
        console.log("MongoDB Connection Success 👍");
    } catch (error) {
        console.log("MongoDB Connection Failed 💥");
        process.exit(1);
    }
}
module.exports = connectDB;
