import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Follow from '../models/follow.model.js'

export const registerUser = async(req, res)=> {
    const {username, displayName, email, password} = req.body

    if (!username || !displayName || !email || !password) {
        return res.status(400).json({message: "All fields are required!"})
    }

     const newHashedPassword = await bcrypt.hash(req.body.password, 10);

     const user = await User.create({
         displayName,
         username,
         email,
         hashedPassword: newHashedPassword
     })

     const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
    
    res.cookie('token', token, {
        httpOmly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

     const {hashedPassword, ...detailsWithoutPassword} = user.toObject()
     res.status(201).json(detailsWithoutPassword)
}

export const loginUser = async(req, res)=> {
    const {email, password} = req.body

    if (!email || !password) {
        return res.status(400).json({message: "All fields are required!"})
    }

    const user = await User.findOne({email})

    if (!user) {
        return res.status(400).json({message: "Invalid email or password!"})
    }

     const isPasswordCorrect = await bcrypt.compare(password, user.hashedPassword);

     if (!isPasswordCorrect) {
        return res.status(400).json({message: "Invalid email or password!"})
    }

    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
    
    res.cookie('token', token, {
        httpOmly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

     const {hashedPassword, ...detailsWithoutPassword} = user.toObject()
     res.status(200).json(detailsWithoutPassword)
}

export const logoutUser = async(req, res)=> { 
    res.clearCookie('token')

    res.status(200).json({message: "Logout Successful"})
}

export const getUser = async(req, res)=> {
    const {username} = req.params

    const user = await User.findOne({username})

    //Destructure this way to remove hashedPassword from displaying
    const {hashedPassword, ...others} = user._doc
    //OR
    // const {hashedPassword, ...others} = user.toObject()

    const followerCount = await Follow.countDocuments({following: user._id})
    const followingCount = await Follow.countDocuments({follower: user._id})

    const token = req.cookies.token;
    
        if (!token) {
            res.status(200).json({ ...others, followerCount, followingCount, isFollowing: false });
        }else{
            jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
                if (!err) {
                    const isExists = await Follow.exists({
                        follower: payload.userId,
                        following: user._id
                    });
                    res.status(200).json({ ...others, followerCount, followingCount, isFollowing: !!isExists });
                    //isFollowing: !!isExists means convert to boolean. Equivalent to isFollowing: isExists ? true : false
                    // res.status(200).json({ ...others, followerCount, followingCount, isFollowing: !!isExists });
                }
            });
        }
}

export const followUser = async(req, res)=> {
    const {username} = req.params

    const user = await User.findOne({username})

    const isFollowing = await Follow.exists({
        follower: req.userId,
        following: user._id
    })

    if (isFollowing) {
        //Unfollow
        await Follow.deleteOne({
            follower: req.userId,
            following: user._id
        })
    } else {
        //Follow
        await Follow.create({
            follower: req.userId,
            following: user._id
        })
    }

    res.status(200).json({message: isFollowing ? "Unfollowed successfully" : "Followed successfully"})
}