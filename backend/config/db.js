const mongoose = require('mongoose')

const conn = async(req, res) => {
    try{
        await mongoose
            .connect("mongodb+srv://Admin:admin@cluster0.mgif8.mongodb.net/")
            .then(() => {
                console.log("Connected to MongoDB")
            })
    } catch (error) {
        console.error("error connecting to mongodb" ,error.message)
        throw error;
    } 
}

conn()