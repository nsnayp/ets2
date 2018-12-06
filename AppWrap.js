//Try something intresting, the one more

// https://expo.io/dashboard/notifications  - эта штука реально отправляет нотифы даже закрытые
/*
https://docs.expo.io/versions/v30.0.0/distribution/building-standalone-apps
https://docs.expo.io/versions/latest/guides/push-notifications
https://docs.expo.io/versions/latest/guides/using-fcm
https://expo.io/dashboard/notifications
From work test
*/

import * as React from 'react';
import {Text,AsyncStorage,TouchableOpacity,View} from 'react-native';
import AppAuth from './pages/AppAuth';
import AppNoAuth from './pages/AppNoAuth';
import {connect} from 'react-redux';
import {setCustomerId} from './actions/AppWrapActions';


class AppWrap extends React.Component {

	constructor(props) {
        super(props)
        
        this.state = {
            isGetCustomerId:false
        }

        AsyncStorage.getItem('customer_id')
		.then(value => {
            this.props.setCustomerId(value);
            this.setState({
                isGetCustomerId:true
            })
		})
		.done();

    }

	render() {
		if(this.props.customer_id&&this.props.customer_id>0&&this.state.isGetCustomerId===true){
			return(<AppAuth></AppAuth>);
		}else if(!this.props.customer_id&&this.state.isGetCustomerId===true){
			return(<AppNoAuth></AppNoAuth>);
        }else if(this.state.isGetCustomerId===false) {
            return null;
        }
        else{
			return (

            <TouchableOpacity onPress={()=>{this.props.setCustomerId(null)}}>
                <View style={{backgroundColor:'#3F51B5', paddingVertical:16, paddingHorizontal:32, borderRadius:3, elevation:1}}>
                    <Text style={{color:'#fff', textAlign:'center'}}>Выйти {this.props.customer_id}</Text>
                </View>
            </TouchableOpacity>

            );
		}
    }
}


const mapStateToProps = state => {
    return {
        customer_id : state.appwrap.customer_id,
    }
}
const mapDispatchToProps = (dispatch, payload) => {
    return{
        setCustomerId: (payload) => dispatch(setCustomerId(payload))
    } 
}
export default connect(mapStateToProps, mapDispatchToProps)(AppWrap)