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



export const fetchSearchResult = (payload) =>{
    return (dispatch) => {
        fetch('http://etsgroup.ru/search/api?text='+payload)
        .then(data => data.json())
        .then(data =>  dispatch(addSearchResult(data)) )
        .catch((err) => console.log('err:', err))
    }
}


export const navigate = (payload, params = {}) =>{
    //dispatch(toggleSearchPanel(false))
    params = { ...{headerText:'ETS GROUP'}, ...params }
    return {
        type:'NAVIGATE',
        payload:payload,
        params:params
    }
}