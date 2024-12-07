import User from "../models/userModel.js";
import { errorHandler } from "../utills/error.js";
import bcryptjs from "bcryptjs";

export const allUsers = async (req, res, next) =>{
    try {
        const users = await User.find({isAdmin: false});
        if(!users) return next(errorHandler(404, "No user found"));
        res.json(users);
    } catch (error) {
        return next(errorHandler(500, "Server not responding"))
    }
}

export const deleteUser = async (req, res, next) => {
    const userId = req.params.id;
    try {
        await User.findByIdAndDelete(userId);
        res.status(201).json({message: 'user deleted successfully'});
    } catch (error) {
        console.log(error);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const {userName, email, password, isBlocked} = req.body;
        const updateUser = await User.findOne({_id: userId});

        if(!updateUser) {
            return next(errorHandler(404, "User not found"));
        }
        if(userName) {
            updateUser.userName = userName;
        }
        if(email) {
            updateUser.email = email;
        }
        if(password) {
            const validPassword = bcryptjs.compareSync(password, updateUser.password);
            updateUser.password = validPassword;
        }
        console.log(updateUser);
        await updateUser.save();
        res.json(updateUser);
    } catch (error) {
        console.log(error);
    }
};

export const addUser = async (req, res, next) => {
    const {userName, email, password, isAdmin} = req.body;
    try {
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({userName, email, password, isAdmin});
        await newUser.save();
        res.status(201).json({message:"user added successfully"});
    } catch (error) {
        
    }
};

export const blockUser = async (req, res, next) => {
    const userId = req.params.id;
    const {isBlocked} = req.body;
    try {
        const userData = await User.findOne({_id: userId});
        if(!userData) return next(errorHandler(404, "user not found"));

        userData.isBlocked = isBlocked;
        await userData.save();
        res.status(201).json({message: "User blocked"});
    } catch (error) {
        return next(errorHandler(500, "server not responding"));
    }
};