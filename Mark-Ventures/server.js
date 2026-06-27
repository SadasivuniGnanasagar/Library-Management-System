const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bookRoutes = require("./routes/bookRoutes");
const cors = require("cors");
dotenv.config();

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
// Middleware
app.use(express.json());
app.use("/api/books", bookRoutes);
// Home Route
app.get("/", (req, res) => {
    res.send("Library Management System API is Running...");
});

// Connect to MongoDB
mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
        console.log("✅ MongoDB Connected Successfully");

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("❌ MongoDB Connection Error:");
        console.error(error);
    });