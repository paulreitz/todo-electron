import { listActions } from '../storeActions';

export default (state = [], action) => {
    switch(action.type) {
        case listActions.SET_LIST:
            return action.list;
        case listActions.CLEAR_LIST:
            return [];
        default: 
            return state;
    }
}