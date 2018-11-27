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