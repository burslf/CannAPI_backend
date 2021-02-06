const MongoUtil = require('../config/MongoUtil');

exports.addStrain = async (strain) => {
    const _db = MongoUtil.getDb();
    try{
        const allCollection = _db.collection('strains_all');
        const result = await allCollection.insertOne(strain);
        return result;
    }catch{
        return null;
    }
}
exports.addDescription = async (name, description) => {
    const _db = MongoUtil.getDb()
    try {
        const allCollection = _db.collection('strains_all')
        const result = await allCollection.updateOne({"name": name}, {$set: {"description" : description}})
        return result
    } catch {
        return null
    }
} 

exports.getAllStrains = async () => {
    const _db = MongoUtil.getDb();
    try{
        const allCollection = _db.collection('strains_all')
        const allStrains = await allCollection.find({}).toArray()
        return allStrains
    }
    catch {
        return null
    }
}

exports.getStrainByName = async (name) => {
    const _db = MongoUtil.getDb()
    try {
        const allCollection = _db.collection('strains_all')
        const strain = await allCollection.findOne({"name":name.toLowerCase()})
        return strain
    } catch {
        return null
    }
}

exports.getStrainsByType = async (type) => {
    const _db = MongoUtil.getDb()
    try {
        const allCollection = _db.collection('strains_all')
        const strains = await allCollection.find({"type":type.toLowerCase()}).toArray()
        console.log(strains);
        return strains
    } catch {
        return null
    }
}