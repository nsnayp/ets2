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
            //console.log(action.payload,'offers')
            return {
                ...state,
                offers: action.payload
            }
        case 'SHOW_OFFER_GROUP':
            const index = action.payload
            let offers1 = Object.assign(state.offers);

            for(const k in offers1[index].offers){
                offers1[index].offers[k].visible = true;
            }

            return {
                offers:[...offers1],
                productId: state.productId
            } 
        default: return state
    }
}