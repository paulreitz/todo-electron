import { itemsActions } from '../storeActions';

export const setItems = (items) => ({
    type: itemsActions.SET_ITEMS,
    items
});

export const clearItems = () => ({
    type: itemsActions.CLEAR_ITEMS
});