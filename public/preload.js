const { ipcRenderer } = require('electron');
window.ipcRenderer = ipcRenderer;

const todoActions = require('./electron/utils/todoEvents');
window.TodoActions = todoActions;