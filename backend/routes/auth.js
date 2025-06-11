const router = require("express").Router();
const user = require("../models/user");
const User = require("../models/user");
const bcrypt = require("bcryptjs")

router.post("/register", async(req, res) => {
    try{
        const {email,username,password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({email, username, password:hashedPassword })

        await user.save().then(() => {
            res.status(200).json({ user: user })
        })
    
    } catch(error) {
        res.status(400).json({ message: "user already exist",error })
    }
})



router.post("/login", async(req, res) => {
    try{
        const user = await User.findOne({email: req.body.email});

        if(!user) {
            res.status(400).json({ message: "user don't exist"})
        }
        
        const isPasswordCorrect = bcrypt.compareSync(
            req.body.password,
            user.password
        )

        if(!isPasswordCorrect) {
            res.status(400).json({ message: "password is incorrect" })
        }

        const { password, ...others } = user._doc;
        res.status(200).json({ others });

    } catch(error) {
        res.status(400).json({ message: "error in login/incorrect inputs", error })
    }
})

module.exports = router;