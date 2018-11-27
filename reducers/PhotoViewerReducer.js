const INITIAL_STATE = {
    images:[],
    visible:false
 }
 
export default (state = INITIAL_STATE, action)=>{
 
    switch (action.type) {
        case 'SET_VISIBLE':
            return {
                ...state, visible: action.payload
            }
        case 'SET_IMAGES':
            return {
                ...state, images: action.payload
            }

        default: return state
     }
 }