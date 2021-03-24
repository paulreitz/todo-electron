import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import ListReducer from './reducers/ListReducer';
import ItemsReducer from './reducers/ItemsReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
        lists: ListReducer,
        items: ItemsReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
);

export default store;