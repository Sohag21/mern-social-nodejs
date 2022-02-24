const router = require("express").Router();
const Post = require("../models/Post");

//create post
router.post("/", async (req, res)=>{
    const newPost = new Post(req.body);
    try{
        const savePost = await newPost.save();
        res.status(200).json(savePost);
    }catch(err){
        return res.status(500).json(err);
    }
});

//update a post
router.put("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.userId == req.body.userId) {
        await post.updateOne({ $set: req.body });
        res.status(200).json("the post has been updated");
      } else {
        res.status(403).json("you can update only your post");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

//delete a post
//like a post
//get a posts
//get timeline posts

module.exports = router;