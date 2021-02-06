const express = require('express');
const app = express();
require("dotenv").config();
const cors = require('cors')
const bodyParser = require('body-parser')
const AuthController = require('./controllers/AuthController');
const StrainController = require('./controllers/StrainController');

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

//Auth endpoints
app.post("/signup",AuthController.signUp);
app.post("/login",AuthController.login);

// //Image upload enpoint
// app.post("/strain", ImageHandler.upload.single('image'), ImageController.image);
app.post("/strain",StrainController.addStrain)
app.get("/strains",StrainController.getAllStrains)
app.get("/strain/:name",StrainController.getStrainByName)
app.get("/strains/:type",StrainController.getStrainsByType)
app.post("/strain/:name", StrainController.addDescription)
// app.delete("/remove/:id",AuthController.deleteOneResultFromUser);
// app.get("/results",AuthController.getAllUserResults);


app.post("/test",(req,res) => {
    res.send(req.body)
})

module.exports = app;