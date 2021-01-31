const MongoUtil = require('../config/MongoUtil');

exports.addStrain = async (strain, type) => {
    const _db = MongoUtil.getDb();
    try{
        // const typeCollection = _db.collection(`strains_${type}`);
        const allCollection = _db.collection(`strains_all`);
        // const result = await typeCollection.insertOne(strain);
        const result = await allCollection.insertOne(strain);
        return result;
    }catch{
        return null;
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
        console.log(strain);
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