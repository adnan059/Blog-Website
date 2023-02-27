const express = require("express")
const User = require("../models/User")
const Post = require("../models/Post")
const bcrypt = require("bcrypt")

const router = express.Router();

// get a user 
router.get("/:id", async(req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        const {password, ...others} = user._doc;
        res.status(200).json(others)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})



// update a user
router.put("/update/:id", async(req,res)=>{
   if(req.body.userId === req.params.id){

    if (req.body.password){
         req.body.password = await bcrypt.hash(req.body.password,10)
    }

    try {

        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true} )

        res.status(200).json(updatedUser)
        

    } catch (error) {
       res.status(500).json({error: error.message}) 
    }

   }else{
    res.status(401).json({message: "You can update only your account!"})
   }
})

// delete a user
router.delete("/delete/:id", async(req,res)=>{
    if(req.body.userId === req.params.id){

        try {
 
            const user = await User.findById(req.params.id) // returns an object containing the info of the specific user
            
            try {

                await Post.deleteMany({username: user.username})
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json({message: "User successfully deleted"})
                
            } catch (error) {
                res.status(500).json({error: error.message})
            }




        } catch (error) {
            res.status(404).json({message: "User not found!"})
        }

    }else{
        res.status(401).json({message: "You can delete only your account!"})
    }
})





module.exports = router