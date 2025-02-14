
import express from 'express'
import {dbQuery, dbRun} from "../database.js"

const router = express.Router()

router.get("/", async(req,res, next) =>{
    try{
        const plants = await dbQuery("SELECT * FROM plants;")
        res.status(200).json(plants)
    }
    catch(err){
        next(err)
    }
})

router.get("/:id", async(req,res,next) =>{
    try{
        const plant = await dbQuery("SELECT * FROM plants WHERE id = ?;", [req.params.id])
        if(!plant)
        {
            return res.status(404).json({message: "Növény nem található!"})
        }
        res.status(200).json()
    }
    catch(err)
    {
        next(err)
    }
})

router.post("/", async(req,res,next) =>
{
    try{
        const result = await dbRun("INSERT INTO plants(name, perennial, category, price) VALUES (?,?,?,?);", [req.body.name, req.body.perennial, req.body.category, req.body.price])
        res.status(201).json({id: result.lastID, ...req.body})
    }
    catch(err){
        next(err)
    }
})

router.put("/:id", async (req, res, next) => {
    try {
        const plant = await dbQuery("SELECT * FROM plants WHERE id = ?;", [req.params.id]);
        if (!plant) return res.status(404).json({ message: "plant not found" });

        await dbRun("UPDATE plants SET name = ?,perennial = ?, category = ?, price = ? WHERE id = ?;", 
            [req.body.name, req.body.perennial || plant.name, plant.perennial, req.body.category || plant.category, req.params.id]);
        res.status(200).json({ id: req.params.id, name: req.body.name, perennial: req.body.perennial || plant.name,  category: req.body.category || plant.price, });
    } catch (err) {
        next(err);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const plant = await dbQuery("SELECT * FROM plants WHERE id = ?;", [req.params.id]);
        if (!plant) return res.status(404).json({ message: "Sikertelen!" });

        await dbRun("DELETE FROM plants WHERE id = ?;", [req.params.id]);
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
});
export default router