const INITIAL_STATE = {
    searchPanelShown:false,
    text:'',
    currentScreen:'Dashboard',
    
    screenParams:{
        headerText:'ETS GROUP'
    },
    searchResult:[],
    searchText:'',
    loadingSearch:false,
    loadingError:false,
    loaded:false,
    productId:null,
    modalVisible:false
}

export default (state = INITIAL_STATE, action)=>{

    switch (action.type) {

        case 'SEARCH_PANEL_TOGGLE':
            return {
                ...state,
                searchPanelShown: action.payload
            }
        case 'ADD_SEARCH_RESULT':
            return {
                ...state,
                searchResult: action.payload,
                loadingError: false,
                loaded:true
            }
        case 'TOGGLE_MODAL_VISIBLE':
            return {
                ...state,
                modalVisible: action.payload,
            }
        case 'SEARCH_PANEL_ONINPUT':
            return {
                ...state,
                text: action.payload
            }
        case 'SET_SEARCH_TEXT':
            return {
                ...state,
                searchText: action.payload
            }
        case 'SEARCH_PANEL_REMOVE_TEXT':
            return {
                ...state,
                text: ''
            }
        /*case 'SET_PRODUCT_ID':
            return {
                ...state,
                productId: action.payload
            }*/
        case 'LOADING_SEARCH_END':
            return {
                ...state,
                loadingSearch: false,
                loaded:true
            }
        case 'LOADING_SEARCH_START':
            return {
                ...state,
                loadingSearch: true,
                loaded:false
            }
        case 'LOADING_ERROR':
            return {
                ...state,
                loadingSearch: false,
                loadingError: true,
            }
        case 'NAVIGATE':
            return {
                ...state,
                screenParams: action.params,
                currentScreen: action.payload,
                
            }
        default: return state
    }
}