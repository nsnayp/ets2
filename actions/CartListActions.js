import {setCart} from './index';


export const setCarts=(payload)=>{
    return {
        type:'SET_CARTS',
        payload:payload
    }
}

export const setActive=(payload)=>{
    return {
        type:'SET_ACTIVE',
        payload:payload
    }
}

export const fetchCarts=()=>{
    
    return (dispatch,getState) => {
        const customerId = getState().appwrap.customer_id
        const url = 'http://etsgroup.ru/offer/api5?customer_id='+customerId

        fetch(url)
        .then(data=>data.json())
        .then(data=>{
            dispatch(setCarts(data))
            for(var k in data){
                if(data[k].active===true){

                    dispatch(setActive(k));
                    dispatch(setCart(JSON.stringify(data[k].items) ))
                }
            }
        }).catch((err)=>{
            console.log(err)
        });
    }
}