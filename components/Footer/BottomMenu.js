import * as React from 'react';
import {
	View,
	TouchableNativeFeedback,
	Text,
	AsyncStorage
} from 'react-native';
import { MaterialIcons,Feather } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { toggleSearchPanel, navigate,changeScreenParams } from '../../actions/index';


class BottomMenu extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillReceiveProps(props){
		if( JSON.stringify(this.props.cart)!=JSON.stringify(props.cart) && Object.values(this.props.cart).length>0){
			AsyncStorage.setItem('cart', JSON.stringify(props.cart)).catch((error)=>{
        	    console.log('error cart from storage',error)
			})
		}
	}

	renderNotify = ()=>{
		const len = Object.values(this.props.cart).length
		if(len>0){
			return(
				<View style={{position:'absolute', width:19, height:19, borderRadius:18, elevation:2, backgroundColor:'#f44336', padding:0, justifyContent:'center', right:16, top:4}}>
					<Text style={{color:'#fff', fontSize:10, alignSelf:'center'}}>{len}</Text>
				</View>
			)
		}else{
			return null
		}
		
	}

	navigateSearchScreen=()=>{
		requestAnimationFrame(() => {
		if(this.props.productId){
			this.props.navigate('Offers', {backButtonVisible:true})
		}else{
			this.props.navigate('SearchResult', {headerText:'ETS.Поиск'})
		}
		})
	}


	render() {

		return (
			
			<View style={{ backgroundColor: '#fff', width: '100%', justifyContent: 'space-evenly', alignItems: 'stretch', flexDirection: 'row', paddingHorizontal: 10, borderTopColor:'#eee', borderTopWidth:1, elevation: 10  }}>
				{/* <View style={{ width: '20%' }}>
					<TouchableNativeFeedback  onPress={() => requestAnimationFrame(() =>this.props.navigate('Dashboard') )} >
						<View style={{ padding: 12, flexDirection: 'column', alignItems: 'center' }}>
							<Feather name="home" size={23} color={ (this.props.currentScreen=='Dashboard')?'#3F51B5':'#9E9E9E' }  />

						</View>
					</TouchableNativeFeedback>
				</View> */}

				<View style={{ width: '20%' , position:'relative'}}>
					<TouchableNativeFeedback onPress={() => requestAnimationFrame(()=>this.props.navigate('Cart', {headerText:'ETS.Корзина'}))}>
						<View style={{ padding: 12, flexDirection: 'column', alignItems: 'center' }}>
							<Feather name="shopping-cart" size={23} color={ (this.props.currentScreen=='Cart'||this.props.currentScreen=='Orders')?'#3F51B5':'#9E9E9E' } />
						</View>
					</TouchableNativeFeedback>
					{ 
						this.renderNotify()
					}

				</View>


				{/* <View style={{ width: '20%', position:'relative' }}>
					<TouchableNativeFeedback onPress={() => this.props.navigate('Orders', {headerText:'ETS.Заказы'})}>
						<View style={{ padding: 12, flexDirection: 'column', alignItems: 'center' }}>
							<Feather name="clipboard" size={23} color={ (this.props.currentScreen=='Orders')?'#3F51B5':'#9E9E9E' } />
							
						</View>
					</TouchableNativeFeedback>
					{ <View style={{position:'absolute', width:19, height:19, borderRadius:18, elevation:2, backgroundColor:'#f44336', padding:0, justifyContent:'center', right:16, top:4}}>
						<Text style={{color:'#fff', fontSize:10, alignSelf:'center'}}>
						<Feather name="bell" size={10} color={ '#fff' } />
						</Text>
					</View> }
				</View> */}

				<View style={{ width: '20%' }}>
					<TouchableNativeFeedback onPress={() =>this.navigateSearchScreen() }>
						<View style={{ padding: 12, flexDirection: 'column', alignItems: 'center' ,backgroundColor:'#fff'}}>
							<Feather name="search" size={23} color={ (this.props.currentScreen=='SearchResult'||this.props.currentScreen=='Offers'||this.props.currentScreen=='Dashboard')?'#3F51B5':'#9E9E9E' } />
						</View>
					</TouchableNativeFeedback>
				</View>
				
				<View style={{ width: '20%' }}>
					<TouchableNativeFeedback onPress={() => requestAnimationFrame(() => this.props.navigate('Settings', {headerText:'ETS.Настройки'}))}>
						<View style={{ padding: 12, flexDirection: 'column', alignItems: 'center' }}>
							<Feather name="settings" size={23} color={ (this.props.currentScreen=='Settings')?'#3F51B5':'#9E9E9E' } />
						</View>
					</TouchableNativeFeedback>
				</View>
			</View>
			
		)
	}
}


const mapStateToProps = state => {
    return {
		currentScreen: state.app.currentScreen,
		cart:state.cart.cart,
		productId:state.offers.productId,
		
    }
}

const mapDispatchToProps = (dispatch, payload) => {
    return {
		navigate : (payload,params) => dispatch(navigate(payload,params)),
		toggleSearchPanel:(payload)=> dispatch(toggleSearchPanel(payload)),
		/*changeScreenParams: (payload) => dispatch(changeScreenParams(payload)),*/
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomMenu)