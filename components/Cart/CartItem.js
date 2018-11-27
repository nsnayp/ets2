import * as React from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	Animated,
	StyleSheet
} from 'react-native';
import { Feather ,FontAwesome} from '@expo/vector-icons';


import { connect } from 'react-redux';
import {addToCart,deleteFromCart, toggleModalVisible} from '../../actions';
import SrokText from '../../components/Offers/SrokText';
import {prettyNumber} from '../../helpers/helpers';


export class CartItem extends React.Component {
	constructor(props) {
		super(props)
		 
	}


render=()=>{

	const offer = this.props.offer;

	return(
		<Animated.View key={offer.id} style={{width:'100%', flexDirection:'row'}}>
			<View  style={[styles.row1,{width:'100%', flexDirection:'row', backgroundColor:'#fff'}]} >
	
				<View style={styles.column1}>
					<Text>{offer.brand}</Text>
					<Text>{offer.oem}</Text>
				</View>
				<View  style={styles.column2}>
					<Text style={{marginLeft:10, fontSize:14, color:'#999'}}>{offer.cartQty} шт</Text>
				</View>

				<View  style={styles.column4}>
					<Text style={{marginLeft:10, fontSize:14, color:'#999'}}>{prettyNumber(offer.price)} ₽</Text>
				</View>
				<View style={styles.column5}>
					<View  style={styles.infoIcon}>
					<TouchableOpacity>
							<View style={styles.iconPlusWrap}>
								<Feather name="chevron-right" size={22} color="#999" style={{}} />
							</View>
						</TouchableOpacity>
					</View>

				</View>
				
			</View>
			
				

		</Animated.View>
	)
}
}

const styles = StyleSheet.create({
	row1:{width:'33.3333%', flexDirection:'row', justifyContent:'space-between', paddingLeft:16, paddingRight:8,  paddingVertical:4, borderTopColor:'#fafafa', borderTopWidth:1},
	row2:{width:'33.3333%', flexDirection:'row', justifyContent:'space-between', paddingLeft:16, paddingRight:8,   paddingVertical:0,  borderTopColor:'#fafafa', borderTopWidth:1},

	column1: {flexDirection:'column', alignItems:'flex-start', justifyContent:'flex-start', width:'30%'},
	column2: {width:'20%', alignItems:'flex-end', alignContent:'center', justifyContent:'center'},
	column4: {width:'20%',alignItems:'center',  justifyContent:'center', alignContent:'center'},
	column5:{width:'20%', flexDirection:'row', alignItems:'flex-end',justifyContent:'flex-end'},
	infoIcon:{ alignItems:'flex-end', justifyContent:'center'},
	cartBtn:{ alignItems:'flex-end',  justifyContent:'center'},
	cartBtnNotify:{position:'absolute', width:19, height:19, borderRadius:18, elevation:2, backgroundColor:'#f44336', padding:0, justifyContent:'center', left:23, top:-2},
	squireNal:{backgroundColor:'#4CAF50', width:16,borderRadius:2, height:16,borderColor:'#4CAF50'},
	squireDay:{backgroundColor:'#fff', width:16, height:16, borderRadius:2, borderWidth:2,borderColor:'#4CAF50'},
	squireWrap:{flexDirection:'row',alignItems:'center'},
	iconMinusWrap:{paddingVertical:8, paddingRight:10,paddingLeft:8,  marginRight:14, borderRadius:2, backgroundColor:'#fff'},
	iconPlusWrap:{paddingVertical:8, paddingRight:10,paddingLeft:8,  marginRight:14, borderRadius:2, backgroundColor:'#fff'},
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
		
    } 
}
export default connect(mapStateToProps, mapDispatchToProps)(CartItem)