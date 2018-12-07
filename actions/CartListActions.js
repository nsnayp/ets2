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

        console.log(getState().cart.cart);

        const customerId = getState().appwrap.customer_id
        const url = 'http://etsgroup.ru/offer/api5?customer_id='+customerId

        //console.log('fetchCarts', url)

        fetch('http://etsgroup.ru/offer/api5?customer_id=4225')
        .then(data=>data.json())
        .then(data=>{
            //console.log(data)

            dispatch(setCarts(data))
            for(var k in data){
                if(data[k].active===true){
                    console.log(data[k].items)

                    dispatch(setActive(k));
                    dispatch(setCart(JSON.stringify(data[k].items) ))
                }
            }
        }).catch((err)=>{
            console.log(err)
        });
    }
}