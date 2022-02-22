const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');

router.get("/", (req, res)=>{
    res.send("Response from auth route!")
});

// register
router.post("/register", async(req, res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        });

        const user = await newUser.save();
        res.status(200).json(user) 
    }
    catch(err){
        res.status(500).json(err)
    }
});

//login
router.post("/login", async(req, res)=>{
    try{
        // const user = await User.findOne({username: req.body.username});
        // !user && res.status(400).json("Wrong user name or password!");

        const user = await User.findOne({email: req.body.email});
        !user && res.status(400).json("Wrong email!"); 

        // console.log("user",user.username);

        const validated = await bcrypt.compare(req.body.password, user.password);
        !validated && res.status(400).json("Wrong password!");

        const {password, ...others} = user._doc;
        res.status(200).json(others);
    }catch(err){
        // res.status(500).json(err);
        res.status(500).json(err);
        // console.log(err);
    }
});

module.exports = router;