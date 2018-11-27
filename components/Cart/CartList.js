import * as React from 'react';
import {  View, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';
import {toggleSearchPanel} from '../../actions';
import CartItem from './CartItem';
import {prettyNumber} from '../../helpers/helpers';
class CartList extends React.Component {
    constructor(props) {
        super(props)
    }

    renderRow =offer=>{
        return (
            <CartItem key={offer.id} offer={offer}></CartItem>
        )
    }
    cartTotal = () =>{
        let total = 0
        for (const k in this.props.cart){
            total += this.props.cart[k].price*this.props.cart[k].cartQty
        } 
        return total.toString()
    }
    render() {
         return (
            <View>
                <Text style={{padding:30}}>ИТОГО: {prettyNumber(this.cartTotal())}</Text>
                <FlatList
                    data={Object.values(this.props.cart)}
                    renderItem={({item}) =>  this.renderRow(item) }  
                    keyExtractor={(item, index) => index.toString()} 
                    initialNumToRender={15}
                    refreshing={true}
                >
                </FlatList>
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
export default connect(mapStateToProps, mapDispatchToProps)(CartList)