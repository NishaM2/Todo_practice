const mongoose = require("mongoose");

const conn = async (req, res) => {
    try {
        await mongoose
            .connect("mongodb+srv://Admin:42cZ4mPM9fiFOJc6@cluster0.mgif8.mongodb.net/")
            .then(() => {
                console.log("Connected to MongoDB");
            })
    } catch (error) {
        res.status(400).json({
            message: "Error connecting to MongoDB",
        })
    }
}

conn();