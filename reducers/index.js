import { combineReducers } from 'redux';
import AppReducer from './AppReducer';
import offersReducer from './offersReducer';
import cartReducer from './cartReducer';
import CartListReducer from './CartListReducer';
import ScreenReducer from './ScreenReducer';
import PhotoViewerReducer from './PhotoViewerReducer';
import OrderReducer from './OrderReducer';
import OrdersReducer from './OrdersReducer';
import AppWrapReducer from './AppWrapReducer';

export default combineReducers({
    app : AppReducer,
    offers: offersReducer,
    cart: cartReducer,
    carts: CartListReducer,
    screens: ScreenReducer,
    photo: PhotoViewerReducer,
    order: OrderReducer,
    orders: OrdersReducer,
    appwrap: AppWrapReducer

})
