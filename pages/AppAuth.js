import * as React from 'react';
import {
    View ,ActivityIndicator,AsyncStorage, AppState
} from 'react-native';
import { connect } from 'react-redux';
import {navigate,setCart, changeScreenParams} from '../actions';


import { createStackNavigator,NavigationActions  } from 'react-navigation';

import Dashboard from '../pages/Dashboard';
import SearchResult from '../pages/SearchResult';
import Offers from '../pages/Offers';
import Orders from '../pages/Orders';
import Cart from '../pages/Cart';
import Settings from '../pages/Settings';
import SuccessOrder from '../pages/SuccessOrder';

import Header from '../components/Header/Header';
import BottomMenu from '../components/Footer/BottomMenu';
import ImgFullscreen from '../components/ImgFullscreen';


const Navigator = createStackNavigator(
	{   
        
        
		SearchResult: {
			screen: SearchResult,
        },
        Offers: {
			screen: Offers,
        }
        ,
        Orders: {
			screen: Orders,
        }
        ,
        Cart: {
			screen: Cart,
        }
        ,
        Settings: {
			screen: Settings,
        },
        Dashboard: {
			screen: Dashboard,
        },
        SuccessOrder: {
			screen: SuccessOrder,
        }
		
    },
    {
        headerMode :"none",
        cardShadowEnabled :false,
        cardStyle:{
            backgroundColor:'#f7f7f7'
        }
    }
);


class AppAuth extends React.Component {
   



    constructor(props) {
        super(props)
        this.state = {
			currentRoute:0,
        }
        AsyncStorage.getItem('cart')
        .then((cart)=>{
            cart = (!cart)? "{}":cart;
            this.props.setCart(cart)
		}).catch((error)=>{
            this.props.setCart("{}")  
		})
    }

    componentWillReceiveProps(props) {
        if (props.currentScreen!=this.props.currentScreen) {
            this.navigate(props.currentScreen,props.screenParams)
        } 
    }

    navigate = (screen,params = null) => {

        this.props.changeScreenParams({screen:screen, headerText: params.headerText, backButtonVisible: params.backButtonVisible})
		this.navig.dispatch(NavigationActions.navigate( {routeName:screen} ))
	}

    render() {
        //console.log('appAuth', this.props)
        return (
            /* <KeyboardAvoidingView behavior="padding" enabled  */
            <View style={{flex:1, flexDirection:'column', justifyContent:'space-between'}}>
                <Header></Header>
                <ImgFullscreen></ImgFullscreen>

                <Navigator
                    onNavigationStateChange={null}
                    renderLoadingExperimental={() => <ActivityIndicator />}
					onNavigationStateChange={(prevState, currentState) => {
						//console.log(currentState)
                    }}
                   
				 	ref={el => { this.navig = el; }} 
				 /> 
				<BottomMenu currentRoute={this.state.currentRoute} navigation={this.navigate}></BottomMenu>
            </View >
        
            )
    }

}


const mapStateToProps = state => {
    return {
        currentScreen: state.app.currentScreen,
        screenParams: state.app.screenParams
    }
}
const mapDispatchToProps = (dispatch, payload) => {
    return{
        navigate : (payload) => dispatch(navigate(payload)),
        setCart :  (payload) => dispatch(setCart(payload)),
        changeScreenParams: (payload)=>dispatch(changeScreenParams(payload)),
    } 
}
export default connect(mapStateToProps, mapDispatchToProps)(AppAuth)