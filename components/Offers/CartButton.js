import * as React from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	Animated,
	Easing,
	StyleSheet
} from 'react-native';
import { Feather,MaterialIcons,FontAwesome } from '@expo/vector-icons';


import { connect } from 'react-redux';
import {addToCart,deleteFromCart} from '../../actions';

export class CartButton extends React.Component {
	constructor(props) {
		super(props)
	}


render(){
    const offer =this.props.offer;
    if(offer.inCart===false){
		return(
			<TouchableOpacity
			onPress={(e)=>{
				requestAnimationFrame(() => {
				Animated.timing(this.state.carMarginLeft, {
					toValue: 1 ,
					duration: 250,
					easing:Easing.elastic()
				  }).start();
				})
			}}
			>
				<View style={styles.cartBtnFalse}>
					<Feather name="shopping-cart" size={22} color="#999" style={{}} />
				</View>
			</TouchableOpacity>
		)
	}else{
		return(
			<View style={{position:'relative'}}>
				<TouchableOpacity
					onPress={(e)=>{
						requestAnimationFrame(() => {
							Animated.timing(this.state.carMarginLeft, {
								toValue: 1 ,
								duration: 250,
								easing:Easing.elastic()
							  }).start();
						})
					}}
				>
					<View style={styles.cartBtnTrue}>
						<Feather name="shopping-cart" size={22} color="#999" style={{}} />
					</View>
				</TouchableOpacity>

				<View style={styles.cartBtnNotify}>
					<Text style={{color:'#fff', fontSize:10, alignSelf:'center'}}>{offer.cartQty}</Text>
				</View>

			</View>
		)
	}
}

}