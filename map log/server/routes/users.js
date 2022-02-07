const router = require("express").Router();

const User = require("../models/User");
const bcrypt = require('bcrypt');

// register

router.post("/register",async (req,res) => {
    try{
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        //create new user
        const newUser = new User({
            username: req.body.username,
            email:req.body.email,
            password:hashedPassword,
        }) 
        //save user and send response
        const user = await newUser.save();
        res.status(200).json(user._id);
    }catch(err){
        res.status(500).json(err)
    }
})

//get login

router.post("/login" , async (req, res) => {
    try{
        //find user
        const user = await User.findOne({username: req.body.username});
     
        //validate user

       !user && res.status(400).json("Wrong username or password");
            // stop further execution in this callback
        
      
   //validate password
        const validPassword = await bcrypt.compare(
            req.body.password,
             user.password);
             !validPassword && res.status(400).json("Wrong username or password");
             

        //send res
res.status(200).json(user)
    }catch(err){
res.status(500).json(err)
    }
})

module.exports = router