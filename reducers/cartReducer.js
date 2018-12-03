const INITIAL_STATE = {
    cart:{},
    cartRefreshDate: new Date()
 }
 
export default (state = INITIAL_STATE, action)=>{
 
    switch (action.type) {
        case 'SET_CART':
            return {
                cart: action.payload
              }
        case 'ADD_CART':
            return {
                cart: {
                  ...state.cart,
                  [action.payload.id.toString()]: action.payload
                }
              }
        case 'CHANGE_QTY':

            return {
                cart: {
                ...state.cart,
                    [action.payload.id.toString()]: action.payload
                },
                cartRefreshDate: new Date()
            }
        
        case 'DELETE_CART':

        const { [action.payload.id.toString()]: removedItem, ...newCart } = state.cart;
            return {
                cart: newCart
            }
   
        default: return state
     }
 }