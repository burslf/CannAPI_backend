const User = require('../queries/User');
const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');

exports.signUp = async (req,res) => {
    const user = req.body;
        const userFromDb = await User.getUserByEmail(user.email);
        if(userFromDb){
            //User exists
            res.status(409).json({error: true, message: 'User with this email already exists'})
        }else{
            const insertedUser = await UserModel.addUserToDb(user);
            if(insertedUser){
                //Create jwt
                delete insertedUser.password; //We don't want to send password to client
                const token = jwt.sign(
                    {
                        _id: insertedUser._id
                    },
                    process.env.TOKEN_SECRET);
                res.json({user: insertedUser,token: token});
            }else{
                res.status(500).send("Server error!")
            }
        }
    }


exports.login = async (req,res) => {
    let user = req.body;
        const userFromDb = await User.getUserByEmail(user.email);
        if(userFromDb){
            if(UserModel.compareUserPassword(user.password,userFromDb.password)){
                delete userFromDb.password; //We don't want to send password to client
                const token = jwt.sign(
                    {
                        _id: userFromDb._id
                    },
                    process.env.TOKEN_SECRET);
                res.json({user: userFromDb,token: token});
            }else{
                //Password incorrect
                res.status(409).json({error: true, message: 'Email or Password are incorrect!'})
            }
        }else{
            //Email doesn't exist in db
            res.status(409).json({error: true, message: 'Email or Password are incorrect!'})
        }
}


// exports.deleteUserHistory = async (req,res) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     const user = jwt.verify(token,process.env.TOKEN_SECRET);
//     const userId = user._id;
//     const result = await User.deleteUserHistory(userId);
//     if(result) return res.send("Successfully deleted");
//     res.status(500).send("Server error");
// }

// exports.getAllUserResults = async (req,res) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     const user = jwt.verify(token,process.env.TOKEN_SECRET);
//     const userId = user._id;
//     const result = await User.getHistory(userId);
//     if(result){
//         res.json(result);
//     }else{
//         res.status(500).send("Server error");
//     }
// }

// exports.deleteOneResultFromUser = async (req,res) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     const user = jwt.verify(token,process.env.TOKEN_SECRET);
//     const userId = user._id;
//     const resultId = req.params.id;
//     const deleted = await User.deleteOneResult(userId,resultId);
//     if(deleted){
//         res.json("Successfully deleted");
//     }else{
//         res.status(500).send("Server error");
//     }
// }