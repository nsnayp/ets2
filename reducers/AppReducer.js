
const INITIAL_STATE = {
    searchPanelShown:false
}

export default (state = INITIAL_STATE, action)=>{

    switch (action.type) {

        case 'SEARCH_PANEL_TOGGLE':
            return {
                ...state,
                searchPanelShown: action.payload
            }

        default: return state
    }
}