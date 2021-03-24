const sqlite3 = require('sqlite3');
const fs = require('fs');

const firstRun = !fs.existsSync('./public/db.sqlite3');
const database = new sqlite3.Database('./public/db.sqlite3');
const query = (sql) => {
    return new Promise((resolve, reject) => {
        database.all(sql, (error, rows) => {
            if (error) {
                reject({error});
            }
            resolve(rows);
        })
    })
}

module.exports = {
    firstRun,
    database,
    query
}