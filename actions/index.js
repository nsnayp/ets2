export const testChange = (data) =>{
    return {
        type:'TEST_CHANGE',
        payload:data
    }
}

export const toggleSearchPanel = (data) =>{

    return {
        type:'SEARCH_PANEL_TOGGLE',
        payload:data
    }
}