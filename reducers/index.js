import { combineReducers } from 'redux';
import AppReducer from './AppReducer';
import offersReducer from './offersReducer';
import cartReducer from './cartReducer';
import ScreenReducer from './ScreenReducer';

export default combineReducers({
    app : AppReducer,
    offers: offersReducer,
    cart: cartReducer,
    screens: ScreenReducer

})
