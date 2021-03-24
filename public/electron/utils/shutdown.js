const { database } = require('../database');

class Shutdown {
    storeBounds(bounds) {
        return new Promise((resolve, reject) => {
            try {
                const boundsObject = {
                    x: bounds.x >= 0 ? bounds.x : 0,
                    y: bounds.y >= 0 ? bounds.y : 0,
                    width: bounds.width,
                    height: bounds.height
                };
                const boundsString = JSON.stringify(boundsObject);
                console.log(boundsString);
                const sql = `UPDATE window_settings SET value='${boundsString}' WHERE name='bounds';`;
                database.all(sql, (err) => {
                    if (err) console.log(err);
                    resolve();
                })
            }
            catch(error) {
                reject({error});
            }
        })
    }
}

module.exports = Shutdown;