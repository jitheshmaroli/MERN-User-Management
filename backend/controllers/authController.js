import User from '../models/userModel.js';
import bcryptjs from "bcryptjs";
import { errorHandler } from '../utills/error.js';
import jwt from 'jsonwebtoken';


export const home = async (req, res) => {
    try {
        res.send('hello world')
    } catch (error) {
        console.log('error loading home', error)
    }
};

export const signUp = async (req, res, next) => {
    try {
        const {userName, email, password} = req.body;
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({userName, email, password: hashedPassword});
        await newUser.save();
        res.status(201).json({message:"user registered successfully"});
    } catch (error) {
        next(error);
    }
};

export const singIn = async (req, res, next) => {
    const {email, password} = req.body;
    try {
        const validUser = await User.findOne({email});

        if(!validUser) return next(errorHandler(404, "User not found"));

        const validPassword = bcryptjs.compareSync(password, validUser.password);

        if(!validPassword) return next(errorHandler(401, "Invalid user credentials"));

        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
        const {password: hashedPassword, ...rest} = validUser._doc;
        const expiryDate = new Date(Date.now() + 3600000);

        res
            .cookie('access_token', token, {httpOnly: true, expires: expiryDate})
            .status(200)
            .json(rest);
    } catch (error) {
        next(error);
    }
}
