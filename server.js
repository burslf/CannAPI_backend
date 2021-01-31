const app = require('./app');
const MongoUtil = require('./config/MongoUtil');
const port = process.env.PORT || 3001;

//Create one conection pool
MongoUtil.connectToServer((err) => {
    if (err) return console.log(err);
    console.log("Connected to db");
    app.listen(port, () => {
        console.log(`App listening at http://localhost:${port}`);
    })
});