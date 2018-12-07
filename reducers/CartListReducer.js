const INITIAL_STATE = {
    carts:{},
    activeCartId:null
 }
 
export default (state = INITIAL_STATE, action)=>{
 
    switch (action.type) {
        case 'SET_CARTS':
            return {
                carts: action.payload
            }
        case 'SET_ACTIVE':
            return {
                activeCartId: action.payload
            }

        default: return state
     }
 }