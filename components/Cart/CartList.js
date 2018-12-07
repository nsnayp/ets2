import * as React from 'react';
import {  View, FlatList, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {toggleSearchPanel,fetchActualCart,navigate} from '../../actions';
import CartItem from './CartItem';
import {prettyNumber} from '../../helpers/helpers';
class CartList extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount=()=>{
        offerIds = [];
        for(var k in this.props.cart){
            offerIds.push(this.props.cart[k].id)
        }
        this.props.fetchActualCart(offerIds)
    }

    renderListHeader =()=>{
        return(
            <View style={{width:'100%',  justifyContent:'center', alignItems:'center', paddingVertical:8, paddingHorizontal:16}}>
                
                <TouchableOpacity
                     onPress={() => requestAnimationFrame(() => this.props.navigate('Orders', {headerText:'ETS.Заказ'}))}
                >
                        <View style={{backgroundColor:'#3F51B5', paddingVertical:8, paddingHorizontal:16, borderRadius:3, elevation:1}}>
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
        const len = (this.props.cart&&Object.values(this.props.cart)) ? Object.values(this.props.cart).length : 0;
        if(this.props.cart&&len>0 ){
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
        }else{
            return (
            <View style={{flexDirection:'column', justifyContent:'flex-start', alignItems:'center', flex:1, paddingHorizontal:8, paddingVertical:8,backgroundColor:'#fff'}}>
                <Text style={{color:'#37474F', fontSize:18, marginTop:42, marginBottom:4}}>Корзина пуста</Text>
                <Text style={{color:'#607D8B'}}>Положите товар в корзину</Text>
            </View>
            )
        }
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
        navigate : (payload,params) => dispatch(navigate(payload,params)),
    } 
}
export default connect(mapStateToProps, mapDispatchToProps)(CartList)