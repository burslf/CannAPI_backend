const Strain = require('../queries/Strain');

const createStrainObjectToInsert = (strain) => {
    return {
        type: strain.type,
        name: strain.name,
        percentage: strain.percentage,
        description: strain.description,
    }
}

exports.addStrainToDb = async (strain) => {
    const strainToInsert = createStrainObjectToInsert(strain);
    const insertionResult = await Strain.addStrain(strainToInsert);
    if(insertionResult){
        const insertedStrain = insertionResult.ops[0];
        return insertedStrain;
    }else{
        return null;
    }  
}

exports.addDescriptionToDb = async (name, description) => {
    const addedDescription = await Strain.addDescription(name, description)
    if(addedDescription) {
        return addedDescription
    }else{
        return null
    }
}

exports.getStrainFromDb = async (name) => {
    const strain = await Strain.getStrainByName(name);
    if(strain) {
        return strain
    } else {
        return null;
    }
}

exports.getStrainsFromDb = async (type) => {
    const strains = await Strain.getStrainsByType(type);
    if(strains) {
        return strains
    } else {
        return null;
    }
}

exports.getAllStrainsFromDb = async () => {
    const strains = await Strain.getAllStrains()
    if(strains) {
        return strains
    } else {
        return null
    }
}