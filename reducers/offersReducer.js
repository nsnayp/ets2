const INITIAL_STATE = {
   offers:null,
   isLoading:false,
   loadingError:false,
   productId:null,
   images:[]
   
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
        case 'SET_IMAGES':
            return {
                ...state,
                images: action.payload
            }
        
        case 'SOME_CHANGE':
            var id = action.payload;
            var offers = Object.assign(state.offers);

            for(const k in offers){
                for(const k1 in offers[k].offers){
                    if(offers[k].offers[k1].id==id){
                        offers[k].offers[k1].refreshDate = new Date();
                    }
                    
                }
            }
            return {
                ...state,
                offers: [...offers]
            }

        case 'SHOW_OFFER_GROUP':

            var index = action.payload
            var offers1 = Object.assign(state.offers);

            for(const k in offers1[index].offers){
                offers1[index].offers[k].visible = true;
            }
            offers1[index].collapsed = false
            return {
                ...state,
                offers:[...offers1],
                productId: state.productId
            }
         case 'HIDE_OFFER_GROUP':
            var index = action.payload
            var offers1 = Object.assign(state.offers);

            for(const k in offers1[index].offers){
                if(offers1[index].offers[k].hiddenGroup==true){
                    offers1[index].offers[k].visible = false;
                }
            }
            offers1[index].collapsed = true
            return {
                ...state,
                offers:[...offers1],
                productId: state.productId
            } 
        default: return state
    }
}