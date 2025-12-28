import express from 'express'
import { getUser } from '../controllers/user.controller.js'
// import User from '../models/user.model.js'
// import bcrypt from "bcryptjs";

const router = express.Router()

// router.post("/create", async(req,res)=> {
//     const userInformation = req.body
//     console.log(userInformation);

//     const hashedPassword = await bcrypt.hash(req.body.password, 10);

//     await User.create({
//         displayName: req.body.displayName,
//         username: req.body.username,
//         email: req.body.email,
//         hashedPassword: hashedPassword
//     })

//     res.json({message: "User Created"})
    
// })

// router.get("/fetch", async(req, res)=> {
//     const users = await User.find()

//     res.json(users)
    
// })

router.get('/:username', getUser)

export default router