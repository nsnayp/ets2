import * as React from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	Animated,
	Easing,
	StyleSheet,
	InteractionManager, Dimensions
} from 'react-native';
import { Feather,MaterialIcons,FontAwesome } from '@expo/vector-icons';


import { connect } from 'react-redux';
import {addToCart,deleteFromCart, toggleModalVisible} from '../../actions';
import SrokText from './SrokText';
import {prettyNumber} from '../../helpers/helpers';

const w = Dimensions.get("window").width;

export class OfferItem extends React.Component {
	constructor(props) {
		super(props)
		this.state = { ...this.props.offer}
		this.state.carMarginLeft=new Animated.Value(0)
	}

updateFromCart = props =>{
	
	this.setState({
		cartQty:	props.offer.cartQty,
		toCartQty:	props.offer.toCartQty,
		inCart:		props.offer.inCart,
	})
}

componentWillReceiveProps(props){
	this.updateFromCart(props)
}

closeBtn=()=>{
	Animated.timing(this.state.carMarginLeft, {
		toValue: 0 ,
		duration: 250,
		easing:Easing.elastic()
	}).start();
	this.setState({cartQty:null, inCart:false},
		()=>{
			InteractionManager.runAfterInteractions(() => {
				this.props.deleteFromCart(this.state)
			})
		}
	)
}
checkBtn=()=>{

	Animated.timing(this.state.carMarginLeft, {
		toValue: 0 ,
		duration: 250,
		easing:Easing.elastic()
	}).start();
	this.setState({cartQty:this.state.toCartQty, inCart:true},()=>{
		InteractionManager.runAfterInteractions(() => {
			this.props.addToCart(this.state)
		})
	})

}


renderSrok=srok=>{
	return <SrokText srok={srok}></SrokText>
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
				<View style={styles.cartBtnFalse}>
					<Feather name="shopping-cart" size={20} color="#999" style={{}} />
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
						<Feather name="shopping-cart" size={20} color="#999" style={{}} />
					</View>
				</TouchableOpacity>

				<View style={styles.cartBtnNotify}>
					<Text style={{color:'#fff', fontSize:10, alignSelf:'center'}}>{this.state.cartQty}</Text>
				</View>

			</View>
		)
	}
}

changeQty=(znak)=>{
	if(znak==1){
		return (this.state.toCartQty<this.state.qty)? this.state.toCartQty+1:this.state.toCartQty
	}else{
		return (this.state.toCartQty>1)? this.state.toCartQty-1:1
	}
}

render=()=>{

	let carMarginLeft = this.state.carMarginLeft.interpolate({
		inputRange: [0, 1],
		outputRange: [0, -w]
	});

	const offer = this.state;

	const bg = (offer.srok==0)? '#E8F5E9':'#fff';
	const color = (offer.srok==0)? '#2E7D32':'#999';

	if(this.props.visible){
		return(
			<Animated.View key={offer.id} style={{width:'300%', flexDirection:'row', marginLeft:carMarginLeft,backgroundColor:'#fff'}}>
				<View  style={styles.row1}>
		
					<View style={styles.column1}>
						{this.renderSrok(offer.srok)}	
					</View>
					<View  style={styles.column2}>
						<Text style={{marginLeft:10, fontSize:14, color:'#999'}}>{offer.qty} шт</Text>
					</View>

					<View  style={styles.column3}>
					</View>

					<View  style={styles.column4}>
						<Text style={{marginLeft:10, fontSize:14, color:color,backgroundColor:bg,  paddingVertical:2, paddingHorizontal:4, borderRadius:3}}>{ prettyNumber(offer.price)} ₽</Text>
					</View>
					<View style={styles.column5}>
						<View  style={styles.infoIcon}>
							<TouchableOpacity
								onPress={(e)=>{ this.props.toggleModalVisible({modalVisible:true, modalData:offer}) }}
							>
								<View style={styles.cartBtnTrue}>
									<Feather name="info" size={22} color="#999" style={{}} />
								</View>
							</TouchableOpacity>
						</View>
						<View  style={styles.cartBtn}>
							{this.renderCart(offer)}
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
							onPress={this.closeBtn}
						>
							<View style={styles.iconClose}>
								<MaterialIcons name="close" size={22} color="#f44336" style={{}} />
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={this.checkBtn}
						>
							<View style={styles.iconCheck}>
								<Feather name="check" size={22} color="#4CAF50" style={{}} />
							</View>
						</TouchableOpacity>
					</View>
					

				</Animated.View>
			</Animated.View>
		)
	}else{
		return null
	}
}
}

const styles = StyleSheet.create({
	row1:{width:'33.3333%', flexDirection:'row', justifyContent:'space-between', paddingLeft:16, paddingRight:8,  paddingVertical:4, borderTopColor:'#fafafa', borderTopWidth:1},
	row2:{width:'33.3333%', flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingLeft:16, paddingRight:8,   paddingVertical:0,  borderTopColor:'#fafafa', borderTopWidth:1},

	column1: {flexDirection:'row', alignItems:'center', justifyContent:'flex-start', width:'20%'},
	column2: {width:'20%', alignItems:'flex-end', alignContent:'center', justifyContent:'center'},
	column3: {width:'15%', alignItems:'center', justifyContent:'center', alignContent:'center', flexDirection:'row'},
	column4: {width:'20%',alignItems:'center',  justifyContent:'center', alignContent:'center'},
	column5:{width:'25%', flexDirection:'row', alignItems:'flex-end',justifyContent:'flex-end'},
	infoIcon:{ alignItems:'flex-end', justifyContent:'center'},
	cartBtn:{ alignItems:'flex-end',  justifyContent:'center'},
	cartBtnNotify:{position:'absolute', width:19, height:19, borderRadius:18, elevation:2, backgroundColor:'#f44336', padding:0, justifyContent:'center', left:23, top:-2},
	squireNal:{backgroundColor:'#4CAF50', width:16,borderRadius:2, height:16,borderColor:'#4CAF50'},
	squireDay:{backgroundColor:'#fff', width:16, height:16, borderRadius:2, borderWidth:2,borderColor:'#4CAF50'},
	squireWrap:{flexDirection:'row',alignItems:'center'},
	iconMinusWrap:{paddingVertical:8, paddingRight:10,paddingLeft:10,  marginRight:14, borderRadius:2, backgroundColor:'#eee'},
	iconPlusWrap:{paddingVertical:8, paddingRight:10,paddingLeft:10,  marginRight:14, borderRadius:2, backgroundColor:'#eee'},
	qtyText:{paddingVertical:8, paddingRight:10,paddingLeft:8,  marginRight:14, borderRadius:2, backgroundColor:'#fff'},
	cartBtnFalse:{paddingVertical:8, paddingRight:10,paddingLeft:8,borderRadius:2},
	cartBtnTrue:{paddingVertical:8, paddingRight:10,paddingLeft:8, borderRadius:2},
	iconClose:{paddingVertical:8, paddingRight:10,paddingLeft:8,  borderRadius:2},
	iconCheck:{paddingVertical:8, paddingRight:10,paddingLeft:8,  borderRadius:2},
	
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
		
		
    } 
}
export default connect(mapStateToProps, mapDispatchToProps)(OfferItem)