import * as React from 'react';
import {
	View,
	ActivityIndicator,
	Text,Image,BackHandler
} from 'react-native';

import { connect } from 'react-redux';
import {fetchOffers,navigate} from '../actions';
import OffersList from '../components/Offers/OffersList';
import ModalOfferDetail from '../components/ModalOfferDetail';
import ImgFullscreen from '../components/ImgFullscreen';

export class Offers extends React.Component {

constructor(props) {
	super(props); 
}


componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        this.props.navigate('SearchResult') ;
        return true;
    });
}

componentWillUnmount() {
    this.backHandler.remove();
}


renderImage=(image, images)=>{
	return(
		<ImgFullscreen key={image.src} images={images}>
				<View  key={image.key} style={{position:'relative', borderRadius:3, marginLeft:3,width:60, height:60,}}>
					<Image source={{uri:image.src}} style={{width:60, height:60, borderRadius:3}} />
					<View style={{ position:'absolute', width:'100%', top:0, height:'100%', backgroundColor:'#2632387a', zIndex:10, paddingHorizontal:8, paddingVertical:3,  justifyContent:'flex-end' , borderRadius:3}}>
						{ <Text style={{color:'#fff', fontSize:12, width:'100%', textAlign:'center'}}>{images.length} фото</Text> }
					</View>
				</View>
		</ImgFullscreen>
	)
}

renderImageSmall(images){
	if(images&&images.length>0){
        return Object.values(images).map((image,index )=> this.renderImage(image, images) )
	}else{
		return null
	}
}

render() {
    if(this.props.isLoading&&!this.props.offers){
        return(
            <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size="large"></ActivityIndicator>
            </View>
        )
    }else{
        return (
            <View style={{flex:1}}>
                <View style={{flexDirection:'row', paddingVertical:8,backgroundColor:'#fff'}}>
					{ this.renderImageSmall([{src:'http://etsgroup.ru/assets/product/1000/tas/T17692.jpg'},{src:'http://etsgroup.ru/assets/product/1000/cei/190304.jpg'}]) }
				</View>
                <OffersList offers={this.props.offers}></OffersList>
                <ModalOfferDetail/>
            </View>
        );
    }
}
}


const mapStateToProps = state => {
    return {
        isLoading: state.offers.isLoading,
        offers: state.offers.offers,
        
    }
}
const mapDispatchToProps = (dispatch, payload) => {
    return{
        fetchOffers: (payload) => dispatch(fetchOffers(payload)),
        navigate:(payload)=>dispatch(navigate(payload))
    } 
}
export default connect(mapStateToProps, mapDispatchToProps)(Offers)