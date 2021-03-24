import { itemsActions } from '../storeActions';

export default (state = [], action) => {
    switch(action.type) {
        case itemsActions.SET_ITEMS:
            return action.items;
        case itemsActions.CLEAR_ITEMS:
            return [];
        default:
            return state;
    }
}