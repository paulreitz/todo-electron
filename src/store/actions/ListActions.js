import { listActions } from '../storeActions';

export const setList = (list) => ({
    type: listActions.SET_LIST,
    list
});

export const clearList = () => ({
    type: listActions.CLEAR_LIST
});