
const INITIAL_STATE = {
    searchPanelShown:false,
    text:'',
    currentScreen:'Dashboard',
    
    screenParams:{
        headerText:'ETS GROUP'
    },
    searchResult:[],
    searchText:''
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
                searchResult: action.payload
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
        case 'NAVIGATE':
            return {
                ...state,
                screenParams: action.params,
                currentScreen: action.payload,
                
            }
        default: return state
    }
}