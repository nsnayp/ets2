const INITIAL_STATE = {
    loading:true,
    error:false,
    success:false,
    comment:''
 }
 
export default (state = INITIAL_STATE, action)=>{
 
    switch (action.type) {
        case 'TOGGLE_LOADING_O':
            return {
                ...state, error: false, success:false,loading:true
            }
        
        case 'TOGGLE_ERROR_O':
            return {
                ...state, error: true, success:false,loading:false
            }

        case 'TOGGLE_SUCCESS_O':
            return {
                ...state, error: false, success:true,loading:false
            }
    
        case 'TOGGLE_COMMENT_O':
            return {
                ...state, comment: action.payload
            }

        default: return state
     }
 }