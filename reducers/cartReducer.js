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
        
        
        case 'CHANGE_CART_ITEM':
            //console.log('get actual cart')
            var cart = {...state.cart}    

            for(var k in action.payload){
                if(action.payload[k].price!=cart[k].price){
                    cart[k].actualPrice = action.payload[k].price;
                }else{
                    delete cart[k].actualPrice
                }
                if(action.payload[k].rest<cart[k].cartQty){
                    cart[k].actualCartQty = action.payload[k].rest;
                }else{
                    delete cart[k].actualCartQty
                }

            }
            return{
                cart: cart
            }


        case 'DELETE_CART':

        const { [action.payload.id.toString()]: removedItem, ...newCart } = state.cart;
            return {
                cart: newCart
            }
   
        default: return state
     }
 }