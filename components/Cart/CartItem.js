import * as React from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	Animated,
	Easing,
	StyleSheet,InteractionManager
} from 'react-native';
import { Feather,MaterialIcons,FontAwesome } from '@expo/vector-icons';


import { connect } from 'react-redux';
import {addToCart,deleteFromCart, toggleModalVisible, changeQty} from '../../actions';
import SrokText from '../Offers/SrokText';
import {prettyNumber} from '../../helpers/helpers';

export class CartItem extends React.Component {
	constructor(props) {
		super(props)
		this.state = { ...this.props.offer}
		this.state.carMarginLeft=new Animated.Value(0)
	}

updateFromOffer = (props) =>{

	this.setState({
		cartQty:	props.offer.cartQty,
		toCartQty:	props.offer.toCartQty,
		inCart:		props.offer.inCart,
		actualCartQty: props.offer.actualCartQty,
		actualPrice: props.offer.actualPrice,
		price: props.offer.price,
	})
}

componentWillReceiveProps(props){
	InteractionManager.runAfterInteractions(() => {
		this.updateFromOffer(props)
	})
}

closeBtn=()=>{

	Animated.timing(this.state.carMarginLeft, {
		toValue: 0 ,
		duration: 250,
		easing:Easing.elastic()
	}).start();
	
	this.setState({cartQty:this.state.toCartQty, inCart:true},()=>{
		InteractionManager.runAfterInteractions(() => {
			this.changeQty1(this.state.toCartQty)
		})
	})

}
checkBtn=()=>{
	Animated.timing(this.state.carMarginLeft, {
		toValue: 0 ,
		duration: 250,
		easing:Easing.elastic()
	}).start();
	this.setState({cartQty:null, inCart:false},()=>{
		InteractionManager.runAfterInteractions(() => {
			this.props.deleteFromCart(this.state)
		})
	})
}



renderSrok=srok=>{
	return <SrokText srok={srok}></SrokText>
}

renderPencil=offer=>{
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
					<Feather name="edit-2" size={20} color="#999" style={{}} />
				</View>
			</TouchableOpacity>
	)
	
}

changeQty=(znak)=>{
	if(znak==1){
		return (this.state.toCartQty<this.state.qty)? this.state.toCartQty+1:this.state.toCartQty
	}else{
		return (this.state.toCartQty>1)? this.state.toCartQty-1:1
	}
}

changeQty1=(val)=>{
	this.setState({cartQty:val, toCartQty:val},()=>{
		this.props.changeQty(this.state)
	});
	
}

renderActualQty=offer=>{
	if(offer.cartQty<offer.cartQty_first){
		
		return (
			<View>
				<Text style={{marginLeft:10, fontSize:14, color:'#999'}}>{offer.cartQty} шт</Text>
				<Text style={{marginLeft:10, fontSize:14, color:'#999',textDecorationLine: 'line-through', textDecorationStyle: 'solid',color:'#ff4444'}}>{offer.cartQty_first} шт</Text>
			</View>
		)
	}else{
		return <Text style={{marginLeft:10, fontSize:14, color:'#999'}}>{offer.cartQty} шт</Text>;
	}
}

renderActualPrice=offer=>{
	if(offer.price!=offer.price_first){
		return (
			<View>
				<Text style={{marginLeft:10, fontSize:14, color:'#999'}}>{ prettyNumber(offer.price)} ₽</Text>
				<Text style={{marginLeft:10, fontSize:14, color:'#999' ,textDecorationLine: 'line-through', textDecorationStyle: 'solid',color:'#ff4444'}}>{ prettyNumber(offer.price_first)} ₽</Text>
			</View>
		)
	}else{
		return <Text style={{marginLeft:10, fontSize:14, color:'#999'}}>{ prettyNumber(offer.price)} ₽</Text>;
	}
}

render=()=>{


	let carMarginLeft = this.state.carMarginLeft.interpolate({
		inputRange: [0, 1],
		outputRange: [0, -410]
	});
	
	const offer = this.state;
	//console.log(offer)
		return(
			<Animated.View key={offer.id} style={{width:'300%', flexDirection:'row', marginLeft:carMarginLeft,backgroundColor:'#fff'}}>
				<View  style={styles.row1}>


					<View  style={styles.column3}>
					<Text>{offer.brand}</Text>
					<Text>{offer.oem}</Text>
					</View>
					<View style={styles.column1}>
						{this.renderSrok(offer.srok)}	
					</View>
					<View  style={styles.column2}>
						
						{this.renderActualQty(offer)}
						
					</View>

					

					<View  style={styles.column4}>
						
						{this.renderActualPrice(offer)}
					</View>
					<View style={styles.column5}>

						<View  style={styles.cartBtn}>
							{this.renderPencil(offer)}
						</View>
					</View>
					
				</View>
				<Animated.View  style={[styles.row2,{backgroundColor:'#fff'}]}>
					<View style={{flexDirection:'row', alignContent:'flex-start', alignItems:'center'}}>

						<TouchableOpacity
							onPress={(e)=>{ this.setState({toCartQty:this.changeQty(0)}) }}
						>
							<View style={styles.iconMinusWrap}>
								<FontAwesome name="minus" size={14} color="#999" style={{}} />
							</View>
						</TouchableOpacity>

						<View style={styles.qtyText}>
							<Text>{this.state.toCartQty} шт</Text>
						</View>
						<TouchableOpacity
						onPress={(e)=>{ this.setState({toCartQty:this.changeQty(1)}) }}
						>
							<View style={styles.iconPlusWrap}>
								<FontAwesome name="plus" size={14} color="#999" style={{}} />
							</View>
						</TouchableOpacity>
					</View>
					<View style={{flexDirection:'row', alignContent:'flex-end', justifyContent:'center', width:'20%'}}>
						<TouchableOpacity
							onPress={this.checkBtn}
						>
							<View style={styles.iconClose}>
								<MaterialIcons name="close" size={22} color="#f44336" style={{}} />
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={this.closeBtn}
						>
							<View style={styles.iconCheck}>
								<Feather name="check" size={22} color="#4CAF50" style={{}} />
							</View>
						</TouchableOpacity>
					</View>
					

				</Animated.View>
			</Animated.View>
		)

}
}

const styles = StyleSheet.create({
	row1:{width:'33.3333%', flexDirection:'row', justifyContent:'space-between', paddingLeft:16, paddingRight:8,  paddingVertical:4, borderTopColor:'#fafafa', borderTopWidth:1},
	row2:{width:'33.3333%', flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingLeft:16, paddingRight:8,   paddingVertical:0,  borderTopColor:'#fafafa', borderTopWidth:1},

	column1: {flexDirection:'row', backgroundColor:'#fff', alignItems:'center', justifyContent:'flex-start', width:'20%'},
	column2: {width:'15%', backgroundColor:'#fff', alignItems:'flex-end', alignContent:'center', justifyContent:'center'},
	column3: {width:'30%', backgroundColor:'#fff', flexDirection:'column'},
	column4: {width:'22%', backgroundColor:'#fff',alignItems:'flex-end',  justifyContent:'center', alignContent:'center'},
	column5:{width:'13%', backgroundColor:'#fff', flexDirection:'row', alignItems:'flex-end',justifyContent:'flex-end'},
	infoIcon:{ alignItems:'flex-end', justifyContent:'center'},
	cartBtn:{ alignItems:'flex-end',  justifyContent:'center'},
	cartBtnNotify:{position:'absolute', width:19, height:19, borderRadius:18, elevation:2, backgroundColor:'#f44336', padding:0, justifyContent:'center', left:23, top:-2},
	squireNal:{backgroundColor:'#4CAF50', width:16,borderRadius:2, height:16,borderColor:'#4CAF50'},
	squireDay:{backgroundColor:'#fff', width:16, height:16, borderRadius:2, borderWidth:2,borderColor:'#4CAF50'},
	squireWrap:{flexDirection:'row',alignItems:'center'},
	iconMinusWrap:{paddingVertical:8, paddingRight:10,paddingLeft:10,  marginRight:14, borderRadius:2, backgroundColor:'#eee'},
	iconPlusWrap:{paddingVertical:8, paddingRight:10,paddingLeft:10,  marginRight:14, borderRadius:2, backgroundColor:'#eee'},
	qtyText:{paddingVertical:8, paddingRight:10,paddingLeft:8,  marginRight:14, borderRadius:2, backgroundColor:'#fff'},
	cartBtnFalse:{paddingVertical:8, paddingRight:10,paddingLeft:8,borderRadius:2, backgroundColor:'#fff'},
	cartBtnTrue:{paddingVertical:8, paddingRight:10,paddingLeft:8, borderRadius:2, backgroundColor:'#fff'},
	iconClose:{paddingVertical:8, paddingRight:10,paddingLeft:8,  borderRadius:2, backgroundColor:'#fff'},
	iconCheck:{paddingVertical:8, paddingRight:10,paddingLeft:8,  borderRadius:2, backgroundColor:'#fff'},
	
  });



const mapStateToProps = state => {
    return {
    }
}
const mapDispatchToProps = (dispatch, payload) => {
    return{
		addToCart: (payload) => dispatch(addToCart(payload)),
		deleteFromCart: (payload) => dispatch(deleteFromCart(payload)),
		toggleModalVisible: (payload) => dispatch(toggleModalVisible(payload)),
		changeQty: (payload) => dispatch(changeQty(payload)),
    } 
}
export default connect(mapStateToProps, mapDispatchToProps)(CartItem)