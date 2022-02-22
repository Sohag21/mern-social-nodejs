const router = require("express").Router();
const User = require("../models/User");

router.get("/", (req, res)=>{
    res.send("Response from auth route!")
});

// register
router.get("/register", async (req, res)=>{
    const user = await new User({
        username: "sohag",
        email: "sohag@gmail.com",
        password: "123456",
    })
    await user.save();
    res.send("ok!")
});

module.exports = router;