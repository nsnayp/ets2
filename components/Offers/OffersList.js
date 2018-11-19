import * as React from 'react';
import {
	Text,
	View,
	ActivityIndicator,
	Animated,
	ScrollView,
	StyleSheet,
	Image,
	
} from 'react-native';


import { connect } from 'react-redux';
import {fetchOffers} from '../../actions';
import OfferItem from './OfferItem'


export class OffersList extends React.Component {

constructor(props) {
	super(props); 
}



componentWillUnmount(){
    //console.log('unmount')
}

componentDidMount(){
    if(!this.props.offers){
        this.props.fetchOffers(this.props.productId)
    }
}

renderOffer=offer=>{
	return (
		<OfferItem key={offer.id} offer={offer}></OfferItem>
	)
}

renderMoreOffers = (offerGroup) =>{
    if(offerGroup.hidden_offer_count>0){ 
        return (
            <View style={{ flexDirection:'row', justifyContent:'flex-end',  paddingHorizontal:16,  paddingVertical:8}}>
                <Text style={{fontSize:13, color:'#86adde'}}>еще {offerGroup.hidden_offer_count} предложений</Text>
            </View>
        )
    }
}

renderOfferGroup = offerGroup =>{
	return(
		<View key={offerGroup.oem} style={{  position:'relative', zIndex:5, marginBottom:24, backgroundColor:'#fff'}}>
			<View style={{ flexDirection:'row', justifyContent:'flex-start',  paddingHorizontal:16,  backgroundColor:'#fafafa', paddingVertical:8}}>

                <Image source={{uri:'http://etsgroup.ru/img_serv/brands/'+offerGroup.brand+'.png'}} style={{width:20, height:20, marginRight:8}}></Image>
				<Text style={{color:'#666', fontWeight:'800'}}>{offerGroup.brand} {offerGroup.oem}</Text>
				
			</View>
			{ Object.values(offerGroup.offers).map(item => this.renderOffer(item))}
			
			{ this.renderMoreOffers(offerGroup) }
							
		</View>
	)
}

renderImage=image=>{
	var src = 'http://etsgroup.ru/assets/product/1000/'+image
	return(
		null
	)
}
renderImages=()=>{
	return null // (this.state.images)? Object.values(this.state.images).map(item => this.renderImage(item[0])) : null 
}


renderOffers = () =>{
    if(this.props.offers){
        return(
            Object.values(this.props.offers).map(item => this.renderOfferGroup(item))
        )
    }
}

render() {
    if(this.props.isLoading){
        return(
            <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size="large"></ActivityIndicator>
            </View>
        )
    }else{
        return (
            <View style={{flex:1, backgroundColor:'#fff'}}>

                    <View>
                        <Animated.ScrollView 
                        showsVerticalScrollIndicator={false}
                        scrollEventThrottle={1}
                        >
                            <View style={styles.scrollViewContent}>

                            <ScrollView horizontal={true} style={{paddingVertical:16, paddingHorizontal:8, flexDirection:'row'}}>
                                {this.renderImages()}
                            </ScrollView>
                            { this.renderOffers() }
                            </View>
                        </Animated.ScrollView>
                    </View>
                
            </View>  
        );
    }
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
        productId:state.offers.productId,
        offers: state.offers.offers,
        isLoading: state.offers.isLoading
    }
}
const mapDispatchToProps = (dispatch, payload) => {
    return{
        fetchOffers: (payload) => dispatch(fetchOffers(payload)),
    } 
}
export default connect(mapStateToProps, mapDispatchToProps)(OffersList)