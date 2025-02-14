import express from 'express'
import bodyParser from 'body-parser';
import { initializeDB } from './database.js';
import plantRouter from './routes/plants.js'

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    
    if (req.method === "OPTIONS") {
        return res.sendStatus(200); // Respond to preflight requests
    }

    next();
});
app.use("/plants", plantRouter)
app.use((err, req, res, next) => {
    console.log(err.message)
})

const startServer = async () => {
    await initializeDB();
    app.listen(3000, () => console.log("Szerver fut a 3000-es porton!"));
};

startServer();