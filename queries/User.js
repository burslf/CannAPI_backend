const MongoUtil = require('../config/MongoUtil');
const ObjectID = require('mongodb').ObjectID;

exports.addUser = async (user) => {
    const _db = MongoUtil.getDb();
    try{
        const collection = _db.collection('users');
        const result = await collection.insertOne(user);
        return result;
    }catch{
        return null;
    }
}

exports.getUserById = async (id) => {
    const _db = MongoUtil.getDb();
    try{
        const collection = _db.collection('users');
        const user = await collection.findOne({"_id": ObjectID(id)});
        return user;
    }catch{
        return null;
    }
}

exports.getUserByEmail = async (email) => {
    const _db = MongoUtil.getDb();
    try{
        const collection = _db.collection('users');
        const user = await collection.findOne({"email": email});
        return user;
    }catch{
        return null;
    }
}

exports.deleteUserHistory = async (userId) => {
    const _db = MongoUtil.getDb();
    try{
        const collection = _db.collection('users');
        await collection.updateOne({_id: ObjectID(userId)}, {$set: {userImages: []}});
        return true;
    }catch{
        return null;
    }
}

exports.getHistory = async (userId) => {
    const _db = MongoUtil.getDb();
    try{
        const collection = _db.collection('users');
        const user = await collection.findOne({"_id": ObjectID(userId)});
        return user.userImages;
    }catch{
        return null;
    }
}

exports.deleteOneResult = async (userId,resultId) => {
    const _db = MongoUtil.getDb();
    try{
        const collection = _db.collection('users');
        const user = await collection.findOne({"_id": ObjectID(userId)});
        let results = user.userImages.filter((resultObj) => {
            return resultObj.resultId!==resultId;
        });
        await collection.updateOne({_id: ObjectID(userId)}, {$set: {userImages: results}});
        return true;
    }catch{
        return null;
    }
}