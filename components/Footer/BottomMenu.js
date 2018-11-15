import * as React from 'react';
import {
	View,
	TouchableNativeFeedback,
	StyleSheet
} from 'react-native';
import { MaterialIcons,Feather } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { toggleSearchPanel, onInput, removeText ,navigate } from '../../actions/index'


class BottomMenu extends React.Component {
	constructor(props) {
		super(props);
		console.log(this.props.currentRoute)
	}

	_onPress = (screen) =>{
		requestAnimationFrame(() => {
			this.props.navigation(screen); 
		})  
	}

	render() {

		return (
			
			<View style={{ backgroundColor: '#fff', width: '100%', justifyContent: 'space-evenly', alignItems: 'stretch', flexDirection: 'row', paddingHorizontal: 10, borderTopColor:'#eee', borderTopWidth:1, elevation: 10  }}>
				<View style={{ width: '20%' }}>
					<TouchableNativeFeedback  onPress={()=>this.props.navigate('Dashboard')} >
						<View style={{ padding: 12, flexDirection: 'column', alignItems: 'center' }}>
							<Feather name="home" size={25} color={ (this.props.currentScreen=='Dashboard')?'#3F51B5':'#8a8a8a' }  />

						</View>
					</TouchableNativeFeedback>
				</View>
				<View style={{ width: '20%' }}>
					<TouchableNativeFeedback onPress={() => this.props.navigate('Orders', {headerText:'ETS.Заказы'})}>
						<View style={{ padding: 12, flexDirection: 'column', alignItems: 'center' }}>
							<Feather name="folder" size={25} color={ (this.props.currentScreen=='Orders')?'#3F51B5':'#8a8a8a' } />
							{/* <Text style={{fontSize:12, color:'#999'}}>Домой</Text> */}
						</View>
					</TouchableNativeFeedback>
				</View>
				<View style={{ width: '20%' }}>
					<TouchableNativeFeedback onPress={() =>this.props.navigate('SearchResult', {headerText:'ETS.Поиск'})}>
						<View style={{ padding: 12, flexDirection: 'column', alignItems: 'center' ,backgroundColor:'#fff'}}>
							<Feather name="search" size={25} color={ (this.props.currentScreen=='SearchResult')?'#3F51B5':'#8a8a8a' } />
						</View>
					</TouchableNativeFeedback>
				</View>
				<View style={{ width: '20%' }}>
					<TouchableNativeFeedback onPress={() => this.props.navigate('Cart', {headerText:'ETS.Корзина'})}>
						<View style={{ padding: 12, flexDirection: 'column', alignItems: 'center' }}>
							<Feather name="shopping-cart" size={25} color={ (this.props.currentScreen=='Cart')?'#3F51B5':'#8a8a8a' } />
						</View>
					</TouchableNativeFeedback>
				</View>
				<View style={{ width: '20%' }}>
					<TouchableNativeFeedback onPress={() => this.props.navigate('Offers', {headerText:'ETS.Настройки'})}>
						<View style={{ padding: 12, flexDirection: 'column', alignItems: 'center' }}>
							<Feather name="settings" size={25} color={ (this.props.currentScreen=='Offers')?'#3F51B5':'#8a8a8a' } />
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
    }
}

const mapDispatchToProps = (dispatch, payload) => {
    return {
		navigate : (payload,params) => dispatch(navigate(payload,params)),
		toggleSearchPanel:(payload)=> dispatch(toggleSearchPanel(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomMenu)