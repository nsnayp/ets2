import * as React from 'react';
import {
    View ,ActivityIndicator,AsyncStorage, AppState
} from 'react-native';
import { connect } from 'react-redux';
import {toggleSearchPanel,navigate,setCart} from '../actions';


import { createStackNavigator,NavigationActions  } from 'react-navigation';

import Dashboard from '../pages/Dashboard';
import SearchResult from '../pages/SearchResult';
import Offers from '../pages/Offers';
import Orders from '../pages/Orders';
import Cart from '../pages/Cart';
import Settings from '../pages/Settings';

import Header from '../components/Header/Header';
import BottomMenu from '../components/Footer/BottomMenu';

const Navigator = createStackNavigator(
	{   
        
        
		Dashboard: {
			screen: Dashboard,
        },
        Offers: {
			screen: Offers,
        },
        SearchResult: {
			screen: SearchResult,
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
    }

    componentWillMount(){
        console.log('will mount')
        AsyncStorage.getItem('cart')
        .then((cart)=>{
            console.log('cart from storage',cart)
            this.props.setCart(JSON.parse(cart))
		}).catch((error)=>{
            console.log('error cart from storage',error)
		})
        
    }


    componentWillReceiveProps(props) {
        if (props.currentScreen!=this.props.currentScreen) {
            this.navigate(props.currentScreen)
        } 
    }

    navigate = (screen, params = {search:null}) => {
		this.navig.dispatch(NavigationActions.navigate( {routeName:screen, params: params} ))
	}

    render() {
        //console.log('appAuth', this.props)
        return (
            /* <KeyboardAvoidingView behavior="padding" enabled  */
            <View style={{flex:1, flexDirection:'column', justifyContent:'space-between'}}>
                <Header></Header>
                

                <Navigator
                    onNavigationStateChange={null}
                    renderLoadingExperimental={() => <ActivityIndicator />}
					/*onNavigationStateChange={(prevState, currentState) => {
						this.curState(currentState)
                    }}*/
                   
				 	ref={el => { this.navig = el; }} 
				 /> 
				<BottomMenu currentRoute={this.state.currentRoute} navigation={this.navigate}></BottomMenu>
            </View >
        
            )
    }

}


const mapStateToProps = state => {
    return {
        searchPanelShown: state.app.searchPanelShown,
        currentScreen: state.app.currentScreen,
    }
}
const mapDispatchToProps = (dispatch, payload) => {
    return{
        toggleSearchPanel: (payload) => dispatch(toggleSearchPanel(payload)),
        navigate : (payload) => dispatch(navigate(payload)),
        setCart :  (payload) => dispatch(setCart(payload)),
    } 
}
export default connect(mapStateToProps, mapDispatchToProps)(AppAuth)