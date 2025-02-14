/*Név (szöveges mező)
Évelő-e (logikai érték: igaz vagy hamis)
Kategória (virág, bokor vagy fa)
Ár (egész szám)*/

import sqlite3 from "sqlite3"

const db = new sqlite3.Database("./database.sqlite")

const initializeDB = async () =>{
    await dbRun("CREATE TABLE IF NOT EXISTS plants( id INTEGER PRIMARY KEY AUTOINCREMENT, name STRING, perennial BOOLEAN, category TEXT, price INTEGER)")
    /*const plants = [
        {
            id:1,
            name:"Tulipán",
            perennial: false,
            category: "virág",
            price: 500
        },
        {
            id:2,
            name:"Barackfa",
            perennial: true,
            category: "fa",
            price: 5000
        },
        {
            id:3,
            name:"Málnabokor",
            perennial: true,
            category: "bokor",
            price: 2500
        },
        {
            id:4,
            name:"Rózsa",
            perennial: false,
            category: "virág",
            price: 900
        },
    ]

    for(const plant of plants)
    {
        await dbRun("INSERT INTO plants(name, perennial, category, price)VALUES (?, ?, ?, ?)", [plant.name, plant.perennial, plant.category, plant.price]);
    }*/
}

function dbQuery(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

function dbRun(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve(this);
        });
    });
}

export { db, dbQuery, dbRun, initializeDB };