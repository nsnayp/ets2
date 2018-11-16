//import { connect } from 'react-redux';

export const toggleSearchPanel = (payload) =>{
    return {
        type:'SEARCH_PANEL_TOGGLE',
        payload:payload
    }
}


export const addSearchResult = (payload) =>{
    return {
        type:'ADD_SEARCH_RESULT',
        payload:payload
    }
}


export const onInput = (payload) =>{
    return {
        type:'SEARCH_PANEL_ONINPUT',
        payload:payload
    }
}

export const setSearchText = (payload) =>{
    return {
        type:'SET_SEARCH_TEXT',
        payload:payload
    }
}

export const removeText = () =>{
    return {
        type:'SEARCH_PANEL_REMOVE_TEXT'
    }
}

export const loadingSearchStart = () =>{
    return {
        type:'LOADING_SEARCH_START'
    }
}

export const loadingSearchEnd = () =>{
    return {
        type:'LOADING_SEARCH_END'
    }
}
export const loadingError = () =>{
    return {
        type:'LOADING_ERROR'
    }
}

export const setproductId = (payload) =>{
    return {
        type:'SET_PRODUCT_ID',
        payload:payload
    }
}





export const fetchSearchResult = (payload) =>{
    
    return (dispatch) => {
        dispatch(loadingSearchStart());
        //setTimeout(()=>{
        fetch('http://etsgroup.ru/search/api?text='+payload)
        .then(data => data.json())
        .then(data =>  {dispatch(loadingSearchEnd()); dispatch(addSearchResult(data))} )
        .catch((err) => {dispatch(loadingError());})
       // },2000)
    }
}


/* OFFERS PAGE ACTIONS */

export const offersSetProductId = (payload) =>{
    return {
        type:'SET_PRODUCT_ID',
        payload:payload
    }
}

export const setIsLoading = (payload) =>{
    return {
        type:'SET_IS_LOADING',
        payload:payload
    }
}

export const setOffers = (payload) =>{
    return {
        type:'SET_OFFERS',
        payload:payload
    }
}


export const fetchOffers = (payload) =>{
    return (dispatch) => {
        dispatch(setIsLoading(true))
        fetch('http:/10.0.30.21/offer/api/'+payload+'?k=Ght59Jfesksef324')
        .then(data => data.json())
        .then(data =>  {
            var newdata = {}
            var images = data.product.img.img
            for(k in data.offers){
                var item = data.offers[k]

                item.inCart = false;
                item.toCartQty=1;
                item.qty=item.rest;
                item.visible = (item.visible)?true:false;
                

                var key = item.brand+item.oem
                if(!newdata[key]){newdata[key]={}; newdata[key].offers=[] }
                newdata[key].hidden_offer_count = item.hidden_offer_count;
                newdata[key].oem = item.oem;
                newdata[key].brand = item.brand; 
                newdata[key].offers.push(item)
            }
            var newdata1 = []
            for(k in newdata){
                newdata1.push(newdata[k])
            }
            
            dispatch(setOffers(newdata1))
            dispatch(setIsLoading(false))
        })
            
        .catch((err) => {
            dispatch(setIsLoading(false))
            dispatch(loadingError());
        })

    }
}


/* OFFERS PAGE ACTIONS END*/

/* CART PAGE ACTIONS */

export const addToCart = (payload) =>{
    return {
        type:'ADD_CART',
        payload:payload
    }
}
export const deleteFromCart = (payload) =>{
    return {
        type:'DELETE_CART',
        payload:payload
    }
}

/* CART PAGE ACTIONS END*/



export const navigate = (payload, params = {}) =>{
    //dispatch(toggleSearchPanel(false))
    params = { ...{headerText:'ETS GROUP', backButtonVisible: false}, ...params }
    return {
        type:'NAVIGATE',
        payload:payload,
        params:params
    }
}