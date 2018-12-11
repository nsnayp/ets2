const setError=()=>{
    return {
        type:'SET_ERROR'
    }
}

const setLoading=()=>{
    return {
        type:'SET_LOADING'
    }
}

const setOrders=(payload)=>{
    return {
        type:'SET_ORDERS',
        payload:payload
    }
}

export const setActiveOrder=(payload)=>{
    return {
        type:'SET_ACTIVE_ORDER',
        payload:payload
    }
}

export const fetchOrders=()=>{
    
    return (dispatch,getState) => {
        dispatch(setLoading())

        const customerId = getState().appwrap.customer_id
        const url = 'http://etsgroup.ru/offer/api6?customer_id='+customerId

        fetch(url)
        .then(data=>data.json())
        .then(data=>{
            dispatch(setOrders(data))
        }).catch((err)=>{
            dispatch(setError(data))
        });
    }
}