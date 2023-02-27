const express = require("express")
const Category = require("../models/Category")
const router = express.Router()


// create a category
router.post("/create", async(req,res)=>{
    try {
        const newCategory = new Category(req.body)
        const result = await newCategory.save()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})



// get all categories
router.get("/view", async(req,res)=>{
    try {
       const categories = await Category.find({}) 
       res.status(200).json(categories)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})








module.exports = router