import { combineReducers } from 'redux';
import AppReducer from './AppReducer';
import offersReducer from './offersReducer';
import cartReducer from './cartReducer';

export default combineReducers({
    app : AppReducer,
    offers: offersReducer,
    cart: cartReducer,

})
