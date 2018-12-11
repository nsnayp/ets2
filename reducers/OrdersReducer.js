const INITIAL_STATE = {
    loading:true,
    error:false,
    orders:null,
    activeOrder:null
 }
 
export default (state = INITIAL_STATE, action)=>{
 
    switch (action.type) {
        case 'SET_LOADING':
            return {
                ...state, error: false, success:false,loading:true
            }
        
        case 'SET_ERROR':
            return {
                ...state, error: true, success:false,loading:false
            }
            
        case 'SET_ACTIVE_ORDER':
            return {
                ...state, activeOrder: action.payload
            }

        case 'SET_ORDERS':
            return {
                ...state, orders: action.payload,loading:false, error: false
            }

        default: return state
     }
 }