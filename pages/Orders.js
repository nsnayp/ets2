import * as React from 'react';
import { Text, View, Button, Image, TextInput,TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import {toggleSearchPanel,navigate,toggleCommentO} from '../actions';
import {prettyNumber} from '../helpers/helpers';
class Orders extends React.Component {
    constructor(props) {
        super(props)
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
            <View style={{flex:1, flexDirection:'column', paddingVertical:32, paddingHorizontal:24}}>
                <Text style={{fontSize:20}}>Оформление заказа</Text>
                <Text style={{color:'#546E7A',marginBottom:24}}>Отказ от заказываемого товара не возможен, возврат производится только при наступлении гарантийного случая. Все кроссировки и наименования носят информативный характер и требуют дополнительной проверки клиентом.</Text>

                <Text>Напишите комментарий к заказу</Text>
                <TextInput 
                    multiline={true}
                    numberOfLines={3}
                    placeholder='Комментарий'
                    onChangeText={(text)=>this.props.toggleCommentO(text)}
                    style={{backgroundColor:'#fff', padding:8, borderColor:'#eee', borderWidth:1, marginTop:8, marginBottom:16}}
                ></TextInput>
                <TouchableOpacity
                     onPress={() => requestAnimationFrame(() => this.props.navigate('SuccessOrder', {headerText:'ETS.Заказ'}))}
                >
                        <View style={{backgroundColor:'#3F51B5', paddingVertical:8, paddingHorizontal:16, borderRadius:3, elevation:1, justifyContent:'center'}}>
                            <Text style={{color:'#fff', textAlign:'center'}}>Отправить заказ на сумму {prettyNumber(this.cartTotal())} ₽</Text>
                        </View>
                </TouchableOpacity>
                
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        cart : state.cart.cart,
        comment: state.order.comment
    }
}
const mapDispatchToProps = (dispatch, payload) => {
    return{
        toggleSearchPanel: (payload) => dispatch(toggleSearchPanel(payload)),
        navigate : (payload,params) => dispatch(navigate(payload,params)),
        toggleCommentO : (payload) => dispatch(toggleCommentO(payload)),
        
    } 
}
export default connect(mapStateToProps, mapDispatchToProps)(Orders)