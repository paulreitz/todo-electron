const { firstRun, database, query } = require('../database');

class Startup {

    init() {
        return new Promise((resolve, reject) => {
            if (firstRun) {
                this.setupTables()
                .then(() => {
                    resolve({width: 900, height: 680});
                })
                .catch(error => {
                    reject({error});
                })
            }
            else {
                this.getBounds()
                .then((result) => {
                    try{
                        const bounds = JSON.parse(result);
                        resolve(bounds);
                    }
                    catch(e) {
                        resolve({width: 900, height: 680});
                    }
                    resolve({width: 900, height: 680});
                })
                .catch(() => {
                    resolve({width: 900, height: 680});
                });
            }
        })
    }

    setupTables() {
        return new Promise((resolve, reject) => {
            const listsSql = `
                CREATE TABLE lists (
                    id INTEGER PRIMARY KEY,
                    name TEXT
                );
            `;
            const itemsSql = `
                CREATE TABLE items (
                    id INTEGER PRIMARY KEY,
                    list_id INTEGER,
                    name TEXT,
                    complete INTEGER
                );
            `;
            const settingsSql = `
                CREATE TABLE window_settings (
                    name TEXT,
                    value TEXT
                );
            `;
            const boundsSql = `
                INSERT INTO window_settings (name, value) VALUES ('bounds', '{}');
            `;
            query(listsSql)
            .then(() => {
                return query(itemsSql);
            })
            .then(() => {
                return query(settingsSql);
            })
            .then(() => {
                return query(boundsSql);
            })
            .then(() => {
                resolve();
            })
            .catch(error => {
                reject(error);
            })
        })
    }

    getBounds() {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM window_settings WHERE name='bounds';`;
            database.all(sql, (error, rows) => {
                if (error) {
                    reject();
                }
                resolve(rows[0].value);
            })
        })
    }
}

module.exports = Startup;