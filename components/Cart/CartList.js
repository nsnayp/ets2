import * as React from 'react';
import {  View, FlatList, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {toggleSearchPanel} from '../../actions';
import CartItem from './CartItem';
import {prettyNumber} from '../../helpers/helpers';
class CartList extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount=()=>{
        var needRefresh = false
        for(var k in this.props.cart){
            var item = this.props.cart[k]
            if(item.dc>new Date()){
                needRefresh = true;
            }
        }

        if(needRefresh){
            /*
                fetch
            */
        }



        /*
        CARTITEM
        oem
        brand,
        hit_id
        offer_id
        name
        cartQty
        qty
        price
        srok
        cartDate
        actualQty
        actualPrice
        actualItem
        prob_title / вероятность поставки


        OFFERITEM
        oem
        brand,
        hit_id
        offer_id
        name
        cartQty
        qty
        price
        srok

        
        */
    }

    renderRow =offer=>{
        return (
            <CartItem key={offer.id} offer={offer} qty={offer.cartQty}></CartItem>
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
    } 
}
export default connect(mapStateToProps, mapDispatchToProps)(CartList)