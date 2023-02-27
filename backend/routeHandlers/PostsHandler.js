const express = require("express")
const Post = require("../models/Post")
//const checkLogin = require("../middlewares/checkLogin")
const router = express.Router()



// create a new post
router.post("/create", async(req,res)=>{
    try {
        const newPost = new Post(req.body)
        const result = await newPost.save()
        res.status(200).json(result)
    } catch (error) {
       res.status(500).json({error: error.message}) 
    }
})




// update a post
router.put("/update/:id", async(req,res)=>{
 try {
    const post = await Post.findById(req.params.id)

    if(post.username === req.body.username){

        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body,{new: true})

        res.status(200).json(updatedPost)

    }else{
        res.status(401).json({message: "You can update only your post."})
    }

    
 } catch (error) {
    res.status(500).json({error: error.message})
 }
})




// delete a new post
router.delete("/delete/:id", async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if(post.username === req.body.username){
            await Post.findByIdAndDelete(req.params.id)
            res.status(200).json({message: "Post successfully deleted."})
        }else{
            res.status(401).json({message: "You can delete only your post."})
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})





// view a post
 router.get("/view/:id", async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
 })




// view multiple posts
router.get("/view/", async(req,res)=>{
    try {
        const username = req.query.user;
        const categories = req.query.categories
        let posts;
        if(username && categories){
            posts = await Post.find({username:username,categories:{
                $in: [categories]
            }})
        }
        else if(username && !categories){
            posts = await Post.find({username})
        
        }else if(categories && !username){
            posts = await Post.find({
                categories:{$in:[categories]}
            })
        }
        else{
            posts = await Post.find({})
        }


            
        

        res.status(200).json(posts)

    } catch (error) {
        res.status(500).json({error: error.message})
    }
})






module.exports = router