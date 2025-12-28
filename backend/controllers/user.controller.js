import User from '../models/user.model.js'

export const getUser = async(req, res)=> {
    const {username} = req.params

    const user = await User.findOne({username})

    //Distructure this way to remove hashedPassword from displaying
    const {hashedPassword, ...others} = user._doc
    //OR
    // const {hashedPassword, ...others} = user.toObject()


    res.status(200).json(others)
}