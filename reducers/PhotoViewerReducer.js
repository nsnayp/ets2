const INITIAL_STATE = {
    images:[],
    visible:false,
    activeImage:0
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
        case 'SET_ACTIVE_IMAGE':
            return {
                ...state, activeImage: action.payload
            }
            

        default: return state
     }
 }