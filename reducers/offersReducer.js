const INITIAL_STATE = {
   offers:null,
   isLoading:false,
   loadingError:false,
   productId:null,
   
}

export default (state = INITIAL_STATE, action)=>{

    switch (action.type) {

        case 'SET_PRODUCT_ID':
            return {
                ...state,
                productId: action.payload
            }
        case 'SET_IS_LOADING':
            return {
                ...state,
                isLoading: action.payload
            }
        case 'SET_LOADING_ERROR':
            return {
                ...state,
                loadingError: action.payload
            }
        case 'SET_OFFERS':
            return {
                ...state,
                offers: action.payload
            }    
        default: return state
    }
}