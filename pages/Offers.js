import * as React from 'react';
import {
	View,
	ActivityIndicator,
	
} from 'react-native';

import { connect } from 'react-redux';
import {fetchOffers} from '../actions';
import OffersList from '../components/Offers/OffersList'


export class Offers extends React.Component {

constructor(props) {
	super(props); 
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
            <OffersList></OffersList>
        );
    }
}
}


const mapStateToProps = state => {
    return {isLoading: state.offers.isLoading}
}
const mapDispatchToProps = (dispatch, payload) => {
    return{
        fetchOffers: (payload) => dispatch(fetchOffers(payload)),
    } 
}
export default connect(mapStateToProps, mapDispatchToProps)(Offers)