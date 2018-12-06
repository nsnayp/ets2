const INITIAL_STATE = {
    customer_id:null,
}

export default (state = INITIAL_STATE, action)=>{

    switch (action.type) {

        case 'SET_CUSTOMER_ID':
            return {
                ...state,
                customer_id: action.payload
            }
       
        default: return state
    }
}