const express = require('express');
const app = express();

require("./config/db")
const auth = require("./routes/auth");
const list = require("./routes/list");

app.get("/", (req, res) => {
    res.send("hello")
})

app.use(express.json())
app.use("/api/v1", auth)
app.use("/api/v2", list)

app.listen(3000, ()=> {
    console.log('Server is running on port 3000');
})