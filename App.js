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
import { View, AsyncStorage } from 'react-native';
//import { Notifications } from 'expo';
//import registerForPushNotificationsAsync from './components/registerForPushNotificationsAsync';
import AppAuth from './pages/AppAuth';
import AppNoAuth from './pages/AppNoAuth';


import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';
import reducers from './reducers';


let store = createStore(reducers);


class App extends React.Component {

	state = {
		notification: {},
		logedIn:null,
		userKey:null
	};


	constructor(props) {
		super(props)
		this.logout = this.logout.bind(this)
		this.login = this.login.bind(this)
		AsyncStorage.getItem('userKey')
		.then(value => {
			if(value!=null){
				this.setState({ userKey: value, logedIn:true });
			}else{
				this.setState({ logedIn:false });
			}
		})
		.done();
	}
	logout() {
		console.log('logout')
		AsyncStorage.removeItem('userKey')
		this.setState({
			logedIn: false
		})
	}
	login() {
		console.log('login')
		this.setState({
			logedIn: true
		})
	}
	renderAppController = () => {
		if(this.state.logedIn===true){
			return(<AppAuth navig={this.navig}></AppAuth>);
		}else if(this.state.logedIn===false){
			return(<AppNoAuth login={this.login} ></AppNoAuth>);
		}else{
			return null;
		}
	}
	
	render() {
		return (
			<Provider store={store}>
				<View style={{ flex: 1, padding:0, paddingTop:0 }}>
					{this.renderAppController() } 
				</View>
			</Provider>
		)
	}
}
export default App;