//import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';


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


export const changeScreenParams = (payload)=>{
    return {
        type:'CHANGE_SCREEN_PARAMS',
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

export const toggleModalVisible = (payload) =>{
    return {
        type:'TOGGLE_MODAL_VISIBLE',
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

export const showOfferGroup =(payload)=>{
    return {
        type:'SHOW_OFFER_GROUP',
        payload:payload
    }
}

export const hideOfferGroup =(payload)=>{
    return {
        type:'HIDE_OFFER_GROUP',
        payload:payload
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

export const setImages = (payload) =>{
    return {
        type:'SET_IMAGES',
        payload:payload
    }
}

const changeCartItem = (payload) =>{
    return {
        type:'CHANGE_CART_ITEM',
        payload:payload
    }
}



const toggleLoadingO = () =>{
    return {
        type:'TOGGLE_LOADING_O',
    }
}
const togglErrorO = () =>{
    return {
        type:'TOGGLE_ERROR_O',
    }
}
const toggleSuccesO = () =>{
    return {
        type:'TOGGLE_SUCCESS_O',
    }
}
export const toggleCommentO = (payload) =>{
    return {
        type:'TOGGLE_COMMENT_O',
        payload:payload
    }
}


export const createOrder = (cart,comment='') =>{
    return (dispatch) => {
        //console.log(comment)
        dispatch(toggleLoadingO());

        fetch('http://etsgroup.ru/offer/api3?k=Ght59Jfesksef324&cart='+JSON.stringify(cart)+'&user_id=4225&comment='+comment)
        .then(data => data.json())
        .then(data =>  {
            console.log(data)
            dispatch(setCart("{}"));
            dispatch(toggleSuccesO());
        })
        .catch((err) => {
            console.log(err)
            dispatch(togglErrorO());
        })
        
    }
 }


export const fetchActualCart = payload =>{
   return (dispatch) => {
    fetch('http://etsgroup.ru/offer/api2?k=Ght59Jfesksef324&user_id=4225&offerIds='+JSON.stringify(payload))
    .then(data => data.json())
    .then(data =>  {
        dispatch(changeCartItem(data))
    })
    .catch((err) => {
        console.log('error fetchActualCart',JSON.stringify(payload),err)
    })
   }
}

export const fetchOffers = (payload) =>{
    return (dispatch) => {
        dispatch(setIsLoading(true))
        fetch('http:/etsgroup.ru/offer/api1/'+payload+'?k=Ght59Jfesksef324&user_id=4225')
        .then(data => data.json())
        .then(data =>  {
            
            var newdata = {}
            var images = data.product.img.img
            var newImages = []


            for(i in images){
                newImages.push({src:'http://etsgroup.ru/assets/product/100/'+images[i], srcBig:'http://etsgroup.ru/assets/product/1000/'+images[i], url:'http://etsgroup.ru/assets/product/1000/'+images[i]})
            }

            for(k in data.offers){
                var item = data.offers[k]

                item.inCart = false;
                item.toCartQty=1;
                item.qty=item.rest;
                item.visible = (item.visible)?true:false;
                item.hiddenGroup = (item.visible)?false:true;

                var key = item.brand+item.oem
                if(!newdata[key]){newdata[key]={}; newdata[key].offers=[] }

                newdata[key].collapsed = true
                newdata[key].hidden_offer_count = item.hidden_offer_count;
                newdata[key].oem = item.oem;
                newdata[key].brand = item.brand; 
                newdata[key].offers.push(item)
            }
            var newdata1 = []
            for(k in newdata){
                newdata1.push(newdata[k])
            }
            dispatch(setImages(newImages))
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

/*export const setStorageCart=(payload)=>{
    AsyncStorage.setItem('cart', payload)
    return (dispatch) =>  dispatch(setCart(payload))
}*/

export const setCart=(payload)=>{
    AsyncStorage.setItem('cart', payload)
    return {
        type:'SET_CART',
        payload: JSON.parse(payload)
    }
}

export const changeCartQty = (payload) =>{
    return {
        type:'CHANGE_QTY',
        payload:payload
    }
}



export const changeQty = (payload) =>{
    return (dispatch)=>{
        dispatch(changeCartQty(payload));
    }
}

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
    return {
        type:'NAVIGATE',
        payload:payload,
        params:params
    }
}