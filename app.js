import express from 'express'
import bodyParser from 'body-parser';
import { initializeDB } from './database.js';
import plantRouter from './routes/plants.js'

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())
app.use("/plants", plantRouter)
app.use((err, req, res, next) => {
    console.log(err.message)
})

const startServer = async () => {
    await initializeDB();
    app.listen(3000, () => console.log("Szerver fut a 3000-es porton!"));
};

startServer();