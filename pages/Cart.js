import * as React from 'react';
import { Text, View, Button, Image } from 'react-native';
import { connect } from 'react-redux';
import {toggleSearchPanel} from '../actions';
import OfferItem from '../components/Offers/OfferItem'
class Cart extends React.Component {
    constructor(props) {
        super(props)
    }

    renderRow =offer=>{
        return (
            <OfferItem key={offer.id} offer={offer}></OfferItem>
        )
    }

    render() {
         return (
            <View>
                { (this.props.cart)? Object.values(this.props.cart).map(item => this.renderRow(item)) : null }
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        cart: state.cart.cart
    }
}
const mapDispatchToProps = (dispatch, payload) => {
    return{
        toggleSearchPanel: (payload) => dispatch(toggleSearchPanel(payload)),
    } 
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)