const INITIAL_STATE = {
    screens:{
        Offers:{
            headerText:'ETS.Поиск',
        }, 
        Dashboard:{
            headerText:'ETS GROUP',
        },
        SearchResult: {
			headerText: 'ETS.Поиск',
        }
        ,
        Orders: {
			headerText:'ETS.Заказы',
        }
        ,
        Cart: {
			headerText: 'ETS.Корзина',
        }
        ,
        Settings: {
			headerText:'ETS.Настройки',
        }
        ,
        SuccessOrder: {
			headerText:'ETS.Заказ',
		}
       
    }
}

export default (state = INITIAL_STATE, action)=>{

    switch (action.type) {

        case 'CHANGE_SCREEN_PARAMS':

            let screen =  action.payload.screen
            let nState = Object.assign(state)


            if(action.payload.headerText){
                nState.screens[screen].headerText = action.payload.headerText
            }
            if(action.payload.backButtonVisible){
                nState.screens[screen].backButtonVisible = action.payload.backButtonVisible
            }

            return nState
      
        default: return state
    }
}