import * as React from 'react';
import {
	Text,
	View,
	StyleSheet,
    Image,
    FlatList,
    TouchableOpacity
	
} from 'react-native';

import {showOfferGroup,hideOfferGroup} from '../../actions';
import { connect } from 'react-redux';
import OfferItem from './OfferItem'


export class OffersList extends React.Component {

constructor(props) {
	super(props); 
}


renderOffer=offerGroup=>{
    return offerGroup.offers.map(offer =>{
        return <OfferItem key={offer.id} offer={offer} cart={this.props.cart[offer.id.toString()]} visible={offer.visible}></OfferItem>
    })
}

renderMoreOffers = (offerGroup,index) =>{
    if(offerGroup.hidden_offer_count>0&&offerGroup.collapsed==true){ 
        return (
            <TouchableOpacity
                onPress={ ()=>this.props.showOfferGroup(index)}
            >
            <View style={{ flexDirection:'row', justifyContent:'flex-end',  paddingHorizontal:16,  paddingBottom:8}}>
                <Text style={{fontSize:13, color:'#86adde'}}>еще {offerGroup.hidden_offer_count} предложений</Text>
            </View>
            </TouchableOpacity>
        )
    }else if(offerGroup.hidden_offer_count>0&&offerGroup.collapsed==false){ 
        return (
            <TouchableOpacity
                onPress={ ()=>this.props.hideOfferGroup(index)}
            >
            <View style={{ flexDirection:'row', justifyContent:'flex-end',  paddingHorizontal:16,  paddingBottom:8}}>
                <Text style={{fontSize:13, color:'#86adde'}}>скрыть {offerGroup.hidden_offer_count} предложений</Text>
            </View>
            </TouchableOpacity>
        )
    }
}

renderOfferGroup = (offerGroup, index) =>{

	return(
		<View key={offerGroup.oem} style={{  position:'relative', backgroundColor:'#fff'}}>
			<View style={{ flexDirection:'row', justifyContent:'flex-start',  paddingHorizontal:16,  backgroundColor:'#fafafa', paddingVertical:8}}>

                <Image source={{uri:'http://etsgroup.ru/img_serv/brands/'+offerGroup.brand+'.png'}} style={{width:20, height:20, marginRight:8}}></Image>
				<Text style={{color:'#666', fontWeight:'800'}}>{offerGroup.brand} {offerGroup.oem}</Text>
				
			</View>
			{ this.renderOffer(offerGroup)}
			
			{ this.renderMoreOffers(offerGroup,index) }
							
		</View>
	)
}



render() {
        return (
            <View style={{flex:1, backgroundColor:'#fff'}}>
                
                <FlatList
                    data={this.props.offers}
                    renderItem={({item, index}) =>  this.renderOfferGroup(item,index) }  
                    keyExtractor={(item, index) => index.toString()} 
                    initialNumToRender={6}
                    refreshing={false}
                >
                
                </FlatList>
            </View>

        );

}
}


const styles = StyleSheet.create({
	scrollViewContent: {
		backgroundColor:'#fff'
	},
	header: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		backgroundColor: '#03A9F4',
		overflow: 'hidden',
	  }
  });


  const mapStateToProps = state => {
    return {
        cart: state.cart.cart,

    }
}
const mapDispatchToProps = (dispatch, payload) => {
    return{
        showOfferGroup : payload => dispatch(showOfferGroup(payload)),
        hideOfferGroup : payload => dispatch(hideOfferGroup(payload))
    } 
}
export default connect(mapStateToProps, mapDispatchToProps)(OffersList)
