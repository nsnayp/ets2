
const TEST_CHANGE = 'TEST_CHANGE';
const SEARCH_PANEL_TOGGLE = 'SEARCH_PANEL_TOGGLE';

const INITIAL_STATE = {
    data: 'Click me',
    searchPanelShown:false
}

export default (state = INITIAL_STATE, action)=>{

    switch (action.type) {
        case TEST_CHANGE:
            return {
                ...state,
                data: action.payload
            }
        case SEARCH_PANEL_TOGGLE:
            return {
                ...state,
                searchPanelShown: action.payload
            }
        default: return state
    }
}