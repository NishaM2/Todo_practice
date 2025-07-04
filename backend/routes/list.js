const router = require("express").Router();
const List = require("../models/list");
const user = require("../models/user");

//create
router.post("/addTask", async(req, res) => {
    try {
        const { title, body, email } = req.body;
        const existingUser = await user.findOne({ email})

        if(existingUser) {
            const list = new List({ title, body, user:existingUser })
            await list.save().then(() => {
                res.status(200).json({ list})
            }) 
            existingUser.list.push(list);
            existingUser.save();
        }
    } catch (error) {
        console.log(error);
    }
})


//update
router.put("/updateTask/:id", async(req, res) => {
    try {
        const { title, body, email } = req.body;
        const existingUser = await user.findOne({ email})

        if(existingUser) {
            const list = await List.findByIdAndUpdate(req.params.id, { title, body })
            list.save().then(() => {
                res.status(200).json({ message: "updated successfully"})
            })
        }
    } catch (error) {
        console.log(error);
    }
})


//delete
router.delete("/deleteTask/:id", async(req, res) => {
    try {
        const { email } = req.body;
        const existingUser = await user.findOneAndUpdate(
            {email},
            { $pull: {list:req.params.id} }
        )

        if(existingUser) {
            await List.findByIdAndDelete(req.params.id )
            .then(() => {
                res.status(200).json({ message: "deleted successfully"})
            })
        }
    } catch (error) {
        console.log(error);
    }
})


//get
router.get("/getTask/:id", async(req, res) => {
    const list = await List.find({ user:req.params.id }).sort({ createdAt: -1 })

    if(list.length !== 0) {
        res.status(200).json(list)
    } else {
        res.status(404).json({ message: "no task found" })
    }
    
})

module.exports = router;