import * as React from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	Animated,
	Easing,

} from 'react-native';
import { Feather,MaterialIcons,FontAwesome } from '@expo/vector-icons';


import { connect } from 'react-redux';
import {addToCart,deleteFromCart} from '../../actions';


export class OfferItem extends React.Component {
	constructor(props) {
		super(props)
		this.state = { ...this.props.offer}
		this.state.carMarginLeft=new Animated.Value(0)
		this.state.toCartQty = 1
		
	}
	
renderSrok=srok=>{
	if(srok==0){
		return(
			<View style={{flexDirection:'row',alignItems:'center'}}>
				<View style={{backgroundColor:'#4CAF50', width:16,borderRadius:2, height:16,borderColor:'#4CAF50'}}></View>
				<Text style={{marginLeft:10, fontSize:14, color:'green'}}>Склад</Text>
			</View>
			
		)
	}else{
		return(
			<View style={{flexDirection:'row',alignItems:'center'}}>
				<View style={{backgroundColor:'#fff', width:16, height:16, borderRadius:2, borderWidth:2,borderColor:'#4CAF50'}}></View>
				<Text style={{marginLeft:10, fontSize:14, color:'#424242'}}>{srok} дн</Text>
			</View>
		)
	}
}

renderCart=offer=>{
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
				<View style={{paddingVertical:8, paddingRight:10,paddingLeft:8,borderRadius:2, backgroundColor:'#fff'}}>
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
					<View style={{paddingVertical:8, paddingRight:10,paddingLeft:8, borderRadius:2, backgroundColor:'#fff'}}>
						<Feather name="shopping-cart" size={22} color="#999" style={{}} />
					</View>
				</TouchableOpacity>

				<View style={{position:'absolute', width:19, height:19, borderRadius:18, elevation:2, backgroundColor:'#f44336', padding:0, justifyContent:'center', left:23, top:-2}}>
					<Text style={{color:'#fff', fontSize:10, alignSelf:'center'}}>{this.state.cartQty}</Text>
				</View>

			</View>
		)
	}
}



render=()=>{
	let carMarginLeft = this.state.carMarginLeft.interpolate({
		inputRange: [0, 1],
		outputRange: [0, -410]
	  });
	  const offer = this.state;
	if(offer.visible){
	return(
		<Animated.View key={offer.id} style={{width:'300%', flexDirection:'row', marginLeft:carMarginLeft,}}>
			<View  style={{width:'33.3333%', flexDirection:'row', justifyContent:'space-between', paddingLeft:16, paddingRight:8,  paddingVertical:4, borderTopColor:'#fafafa', borderTopWidth:1}}>
				
				<View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start', width:'20%'}}>
					{this.renderSrok(offer.srok)}	
				
				</View>
				<View  style={{width:'20%', alignItems:'flex-end', alignContent:'center', justifyContent:'center'}}>
					<Text style={{marginLeft:10, fontSize:14, color:'#424242'}}>{offer.qty} шт</Text>
				</View>

				<View  style={{width:'15%', alignItems:'center', justifyContent:'center', alignContent:'center', flexDirection:'row'}}>
					<View style={{width:5, height:14, marginRight:0, backgroundColor:'#4CAF50'}}></View>
					<View style={{width:5, height:14, marginRight:0, backgroundColor:'#4CAF50'}}></View>
					<View style={{width:5, height:14, marginRight:0, backgroundColor:'#4CAF50'}}></View>
					<View style={{width:5, height:14, marginRight:0, backgroundColor:'#4CAF50'}}></View>
					<View style={{width:5, height:14,  marginRight:0, backgroundColor:'#eee'}}></View>
				</View>

				<View  style={{width:'20%',alignItems:'center',  justifyContent:'center', alignContent:'center'}}>
					<Text style={{marginLeft:10, fontSize:14, color:'#424242'}}>{offer.price} ₽</Text>
				</View>
				<View style={{width:'25%', flexDirection:'row'}}>
					<View  style={{ alignItems:'flex-end', width:'50%', justifyContent:'center'}}>
						<Feather name="info" size={22} color="#999" style={{}} />
					</View>
					<View  style={{ alignItems:'flex-end', width:'50%', justifyContent:'center'}}>
						{this.renderCart(offer)}
					</View>
				</View>
				
			</View>
			<View  style={{width:'33.3333%', flexDirection:'row', justifyContent:'space-between', paddingLeft:16, paddingRight:8,   paddingVertical:0,  borderTopColor:'#fafafa', borderTopWidth:1}}>
				<View style={{flexDirection:'row', alignContent:'flex-start'}}>

					<TouchableOpacity
					onPress={(e)=>{ this.setState({toCartQty:this.state.toCartQty-1}) }}
					>
						<View style={{paddingVertical:8, paddingRight:10,paddingLeft:8,  marginRight:14, borderRadius:2, backgroundColor:'#fff'}}>
							<FontAwesome name="minus" size={22} color="#999" style={{}} />
						</View>
					</TouchableOpacity>

					<View style={{paddingVertical:8, paddingRight:10,paddingLeft:8,  marginRight:14, borderRadius:2, backgroundColor:'#fff'}}>
						<Text>{this.state.toCartQty} шт</Text>
					</View>
					<TouchableOpacity
					onPress={(e)=>{ this.setState({toCartQty:this.state.toCartQty+1}) }}
					>
						<View style={{paddingVertical:8, paddingRight:10,paddingLeft:8,  marginRight:14, borderRadius:2, backgroundColor:'#fff'}}>
							<FontAwesome name="plus" size={22} color="#999" style={{}} />
						</View>
					</TouchableOpacity>
				</View>
				<View style={{flexDirection:'row', alignContent:'flex-end', justifyContent:'center', width:'20%'}}>
					<TouchableOpacity
						onPress={(e)=>{
							this.props.deleteFromCart(offer)
							Animated.timing(this.state.carMarginLeft, {
								toValue: 0 ,
								duration: 250,
					
								easing:Easing.elastic()
							}).start();
							this.setState({cartQty:null, inCart:false, toCartQty:1})
							
						}}
					>
						<View style={{paddingVertical:8, paddingRight:10,paddingLeft:8,  borderRadius:2, backgroundColor:'#fff'}}>
							<MaterialIcons name="close" size={22} color="#f44336" style={{}} />
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={(e)=>{


							this.props.addToCart(offer)

							Animated.timing(this.state.carMarginLeft, {
								toValue: 0 ,
								duration: 250,
					
								easing:Easing.elastic()
							}).start();
							this.setState({cartQty:this.state.toCartQty, inCart:true})
						}}
					>
						<View style={{paddingVertical:8, paddingRight:10,paddingLeft:8,  borderRadius:2, backgroundColor:'#fff'}}>
							<Feather name="check" size={22} color="#4CAF50" style={{}} />
						</View>
					</TouchableOpacity>
				</View>
				

			</View>
		</Animated.View>
	)
	}else{
		return null
	}
}
}




const mapStateToProps = state => {
    return {
        
    }
}
const mapDispatchToProps = (dispatch, payload) => {
    return{
		addToCart: (payload) => dispatch(addToCart(payload)),
		deleteFromCart: (payload) => dispatch(deleteFromCart(payload)),
    } 
}
export default connect(mapStateToProps, mapDispatchToProps)(OfferItem)