require("dotenv").config()



const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const authHandler = require("./routeHandlers/AuthHandler")
const usersHandler = require("./routeHandlers/UsersHandler")
const postsHandler = require("./routeHandlers/PostsHandler")
const categoriesHandler = require("./routeHandlers/CategoriesHandler")
const multer = require("multer")





const PORT = process.env.PORT || 5000
const DB_URL = process.env.DB_URL



const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(express.static(`${__dirname}/assets`))




const connect = async()=>{
  try {
    await mongoose.connect(DB_URL)
    console.log("Database connection successful")
  } catch (error) {
    console.log(error);
  }
}
mongoose.set('strictQuery', false);
connect()



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage,
 });
app.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});




app.use("/", authHandler)
app.use("/users", usersHandler)
app.use("/posts", postsHandler)
app.use("/categories", categoriesHandler)




app.use((err,req,res,next)=>{
if(err instanceof multer.MulterError){
  res.status(500).json({error: "Upload Error"})
}else{
  if(res.headersSent){
    return next("Header Problem")
   }else{
     if(err.message){
       res.status(500).json({error: err.message})
     }else{
       res.status(500).json({error: "An error has occured."})
     }
   }
}
})




app.listen(PORT, ()=>console.log(`Server listening on port ${PORT}`))


