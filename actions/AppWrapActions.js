
import { AsyncStorage } from 'react-native';

export const setCustomerId = (payload) =>{
const payloadAsync = (!payload)? "":payload.toString();
    AsyncStorage.setItem("customer_id", payloadAsync);
    return {
        type:'SET_CUSTOMER_ID',
        payload:payload
    }
}


export const auth = (login,password) =>{
    return (dispatch) => {

        fetch(
            "http://etsgroup.ru/call/test?email=" +login +"&password=" +password
        )
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.response.error == 0&& responseJson.response.userKey) {
                dispatch(setCustomerId( responseJson.response.userKey));
            }
            console.log(responseJson.response);
        })
        .catch(error => {
            console.error(error);
        });

    }
}