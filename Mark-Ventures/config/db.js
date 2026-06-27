const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        console.log("DATABASE_URL:", process.env.DATABASE_URL);

        await mongoose.connect(process.env.DATABASE_URL);

        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ Database Connection Failed");
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;