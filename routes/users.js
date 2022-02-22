const router = require("express").Router();


router.get("/", (req, res)=>{
    res.send("Response from users route!")
})
module.exports = router;