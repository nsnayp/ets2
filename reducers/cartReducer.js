const INITIAL_STATE = {
    cart:[],
 }
 
export default (state = INITIAL_STATE, action)=>{
 
    switch (action.type) {
 
        case 'ADD_CART':
            return {
                ...state,
                cart: [...state.cart,action.payload]
            }
        
        case 'DELETE_CART':
            return {
                ...state,
                cart: [
                    ...state.cart.slice(0, action.payload),
                    ...state.cart.slice(action.payload + 1)
                ]
            }
   
         default: return state
     }
 }