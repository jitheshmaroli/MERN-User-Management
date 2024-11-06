import User from '../models/userModel.js';
import bcryptjs from "bcryptjs";


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

export const singIn = async (req, res) => {
    try {
        res.send(req.body);
    } catch (error) {
        console.log("error occured during signin:", error)
    }
}
