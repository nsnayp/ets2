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

    renderListHeader =()=>{
        return(
            <View style={{width:'100%',  justifyContent:'center', alignItems:'flex-start', paddingVertical:8, paddingHorizontal:16}}>
                <Text style={{color:'#546E7A'}}>Отказ от заказываемого товара не возможен, возврат производится только при наступлении гарантийного случая. Все кроссировки и наименования носят информативный характер и требуют дополнительной проверки клиентом.</Text>
                <TouchableOpacity>
                        <View style={{backgroundColor:'#f44336', padding:8}}>
                            <Text style={{color:'#fff'}}>Оформить заказ на сумму {prettyNumber(this.cartTotal())} ₽</Text>
                        </View>
                </TouchableOpacity>
            </View>
        )
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

                <FlatList
                    data={Object.values(this.props.cart)}
                    renderItem={({item}) =>  this.renderRow(item) }  
                    keyExtractor={(item, index) => index.toString()} 
                    initialNumToRender={15}
                    refreshing={true}
                    ListHeaderComponent={this.renderListHeader}
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