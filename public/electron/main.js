const { ipcMain } = require('electron');
const { query } = require('./database');
const todoEvents = require('./utils/todoEvents');

ipcMain.on(todoEvents.GET_LIST_ITEMS, (event, arg) => {
    const sql = 'SELECT * FROM lists;';
    query(sql)
    .then(result => {
        event.reply(todoEvents.SEND_LIST_ITEMS, result);
    })
    .catch(error => {
        event.reply(todoEvents.SEND_LIST_ITEMS, {error});
    })
});

ipcMain.on(todoEvents.ADD_LIST, (event, arg) => {
    const sql = `INSERT INTO lists (name) VALUES ('${arg}');`;
    query(sql)
    .then(() => {
        return query('SELECT * FROM lists;');
    })
    .then(result => {
        event.reply(todoEvents.SEND_LIST_ITEMS, result);
    })
    .catch(error => {
        event.reply(todoEvents.SEND_LIST_ITEMS, {error});
    });
});

ipcMain.on(todoEvents.DELETE_LIST, (event, arg) => {
    const sql = `DELETE FROM lists WHERE id=${arg};`;
    query(sql)
    .then(() => {
        return query(`DELETE FROM items WHERE list_id=${arg};`);
    })
    .then(() => {
        return query('SELECT * FROM lists;');
    })
    .then(result => {
        event.reply(todoEvents.SEND_LIST_ITEMS, result);
    })
    .catch(error => {
        event.reply(todoEvents.SEND_LIST_ITEMS, {error});
    });
});

ipcMain.on(todoEvents.GET_ITEMS, (event, arg) => {
    const listId = isNaN(arg) ? -1 : arg;
    const sql = `SELECT * FROM items WHERE list_id=${listId};`;
    query(sql)
    .then(result => {
        event.reply(todoEvents.SEND_ITEMS, result);
    })
    .catch(error => {
        event.reply(todoEvents.SEND_ITEMS, {error});
    });
});

ipcMain.on(todoEvents.ADD_ITEM, (event, arg) => {
    const sql = `INSERT INTO items (list_id, name, complete) VALUES (${arg.listId}, '${arg.name}', 0);`;
    query(sql)
    .then(() => {
        return query(`SELECT * FROM items WHERE list_id='${arg.listId}';`);
    })
    .then(result => {
        event.reply(todoEvents.SEND_ITEMS, result);
    })
    .catch(error => {
        event.replay(todoEvents.SEND_ITEMS, {error});
    });
});

ipcMain.on(todoEvents.DELETE_ITEM, (event, arg) => {
    const sql = `DELETE FROM items WHERE id=${arg.id};`;
    query(sql)
    .then(() => {
        return query(`SELECT * FROM items WHERE list_id='${arg.listId}';`);
    })
    .then(result => {
        event.reply(todoEvents.SEND_ITEMS, result);
    })
    .catch(error => {
        event.replay(todoEvents.SEND_ITEMS, {error});
    });
});

ipcMain.on(todoEvents.SET_ITEM_COMPLETE, (event, arg) => {
    const sql = `UPDATE items SET complete=${arg.complete} WHERE id=${arg.id};`;
    query(sql)
    .then(() => {
        return query(`SELECT * FROM items WHERE list_id='${arg.listId}';`);
    })
    .then(result => {
        event.reply(todoEvents.SEND_ITEMS, result);
    })
    .catch(error => {
        event.replay(todoEvents.SEND_ITEMS, {error});
    });
})