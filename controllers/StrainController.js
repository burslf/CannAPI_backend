const Strain = require('../queries/Strain');
const StrainModel = require('../models/StrainModel');

exports.addStrain = async (req, res) => {
    const strain = req.body
    const strainFromDb = await Strain.getStrainByName(strain.name)
    if(strainFromDb) {
        res.status(409).json({"error": 'Strain already exists'})
    } else {
        const insertedStrain = await StrainModel.addStrainToDb(strain)
        if(insertedStrain) {
            res.status(200).json({"success":"Strain added successfully"})
        }else {
            res.status(500).send("Server error")
        }
    }
}
exports.addDescription = async (req, res) => {
    const name = req.params.name
    const description = req.body.description
    const strainFromDb = await Strain.getStrainByName(name)
    if(strainFromDb) {
        const insertedStrain = await StrainModel.addDescriptionToDb(name, description)
        if(insertedStrain) {
            res.status(200).json({"success" : "Description added successfully"})
        }else {
            res.status(500).json({"error" : "Server error"})
        }
    }else{
        res.status(409).json({"error": "Strain not found"})
    }
}

exports.getAllStrains = async (req, res) => {
    const allStrains = await StrainModel.getAllStrainsFromDb()
    if(allStrains) { 
        res.status(200).json(allStrains)
    } else {
        res.status(500).send("Server error")
    }
}

exports.getStrainByName = async (req, res) => {
    const name = req.params.name
    const strain = await StrainModel.getStrainFromDb(name)
    if(strain) {
        res.status(200).json(strain)
    } else {
        res.status(500).send("Server error")
    }
}

exports.getStrainsByType = async (req, res) => {
    const type = req.params.type
    const strains = await StrainModel.getStrainsFromDb(type)
    if(strains) {
        res.status(200).json(strains)
    } else {
        res.status(500).send("Server error")
    }
}