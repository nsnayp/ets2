import * as React from 'react';
import {  View, FlatList, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {toggleSearchPanel,fetchActualCart} from '../../actions';
import CartItem from './CartItem';
import {prettyNumber} from '../../helpers/helpers';
class CartList extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount=()=>{
        offerIds = [];
        for(var k in this.props.cart){
            offerIds.push(this.props.cart[k].id)
        }
        this.props.fetchActualCart(offerIds)
    }


    renderRow =cartItem=>{
        return (
            <CartItem key={cartItem.id} offer={cartItem} price={cartItem.price} cartQty={cartItem.cartQty} ></CartItem>
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
                <View style={{flexDirection:'row', paddingVertical:15, paddingHorizontal:16, justifyContent:'space-between', alignItems:'center'}}>
                    <TouchableOpacity>
                        <View style={{backgroundColor:'#ff4444', padding:8}}>
                            <Text style={{color:'#fff'}}>Оформить заказ на сумму {prettyNumber(this.cartTotal())} ₽</Text>
                        </View>
                    </TouchableOpacity>
                </View>
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
        fetchActualCart: (payload) => dispatch(fetchActualCart(payload)),
        
    } 
}
export default connect(mapStateToProps, mapDispatchToProps)(CartList)