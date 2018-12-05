import { combineReducers } from 'redux';
import AppReducer from './AppReducer';
import offersReducer from './offersReducer';
import cartReducer from './cartReducer';
import ScreenReducer from './ScreenReducer';
import PhotoViewerReducer from './PhotoViewerReducer';
import OrderReducer from './OrderReducer';

export default combineReducers({
    app : AppReducer,
    offers: offersReducer,
    cart: cartReducer,
    screens: ScreenReducer,
    photo: PhotoViewerReducer,
    order: OrderReducer

})
