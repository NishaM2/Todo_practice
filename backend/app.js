const express = require("express")
const app = express()

require("./config/db")
const auth = require("./routes/auth")
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello, World!")
})

app.use("/api/v1", auth);

app.listen(3000, ()=> {
    console.log("Server is running on port 3000")
})