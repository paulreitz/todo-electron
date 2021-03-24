import store from './store/configureStore';
import { setList } from './store/actions/ListActions';
import { setItems, clearItems } from './store/actions/ItemsActions';

let initted = false;

const init = () => {
    if (!initted) {
        initted = true;
        window.ipcRenderer.on(window.TodoActions.SEND_LIST_ITEMS, (_, arg) => {
            if (arg.error) {
                console.log(arg.error);
            }
            store.dispatch(setList(arg));
        });
        window.ipcRenderer.on(window.TodoActions.SEND_ITEMS, (_, arg) => {
            if (arg.error) {
                console.log(arg.error);
            }
            store.dispatch(setItems(arg));
        })
    }
}

export const getLists = () => {
    init();
    window.ipcRenderer.send(window.TodoActions.GET_LIST_ITEMS, {});
}

export const addList = (name) => {
    window.ipcRenderer.send(window.TodoActions.ADD_LIST, name);
}

export const deleteList = (id) => {
    window.ipcRenderer.send(window.TodoActions.DELETE_LIST, id);
}

export const getItems = (id) => {
    store.dispatch(clearItems());
    window.ipcRenderer.send(window.TodoActions.GET_ITEMS, id);
}

export const addItem = (arg) => {
    window.ipcRenderer.send(window.TodoActions.ADD_ITEM, arg);
}

export const deleteItem = (arg) => {
    window.ipcRenderer.send(window.TodoActions.DELETE_ITEM, arg);
}

export const setItemComplete = (arg) => {
    window.ipcRenderer.send(window.TodoActions.SET_ITEM_COMPLETE, arg);
}