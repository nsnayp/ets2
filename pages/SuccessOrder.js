import * as React from 'react';
import { Text, View, TouchableOpacity, Image , ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import {toggleSearchPanel,setCart,createOrder,navigate} from '../actions';

class SuccessOrder extends React.Component {

    constructor(props) {
        super(props)
        //console.log('dash', this.props)
    }
    componentDidMount=()=>{
        this.createOrder()
    }

    createOrder=()=>{
        this.props.createOrder(this.props.cart)
    }

    reNavigate=()=>{
        setTimeout(()=>{

            requestAnimationFrame(() => this.props.navigate('Dashboard', {headerText:'ETS GROUP'}))

        },3000)
        
    }

    render() {
        if(this.props.loading&&!this.props.success&&!this.props.error){
            return(
                <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                    <ActivityIndicator size="large"></ActivityIndicator>
                </View>
            )
        }else if(!this.props.loading&&this.props.success&&!this.props.error){
            this.reNavigate();
            return (
                <View style={{flexDirection:'column', justifyContent:'flex-start', alignItems:'center', flex:1, paddingHorizontal:8, paddingVertical:8,backgroundColor:'#fff'}}>
                    
                    <Text style={{fontSize:17, marginTop:42, marginBottom:16}}>Заказ успешно оформлен!</Text>
                    <Text style={{}}>Ожидайте звонка менеджера</Text>
    
                </View>
            )
        }else if(!this.props.loading&&!this.props.success&&this.props.error){
            return (
                <View style={{flexDirection:'column', justifyContent:'flex-start', alignItems:'center', flex:1, paddingHorizontal:8, paddingVertical:8,backgroundColor:'#fff'}}>
                    
                    <Text style={{fontSize:17, marginTop:42, marginBottom:16}}>Ошибка!</Text>
                    <Text style={{}}>Возможно проблемы с подключением</Text>

                    <TouchableOpacity
                        onPress={this.createOrder}
                    >
                            <View style={{backgroundColor:'#3F51B5', paddingVertical:8, paddingHorizontal:16, borderRadius:3, elevation:1, justifyContent:'center'}}>
                                <Text style={{color:'#fff', textAlign:'center'}}>Отправить еще раз</Text>
                            </View>
                    </TouchableOpacity>

                </View>
            )
        }
        else{
            return (
                <View style={{flexDirection:'column', justifyContent:'flex-start', alignItems:'center', flex:1, paddingHorizontal:8, paddingVertical:8,backgroundColor:'#fff'}}>
                    
                    <Text style={{fontSize:17, marginTop:42, marginBottom:16}}>Неизвестная ошибка!</Text>
                    <Text style={{}}>Обратитесь в тех поддержку</Text>
                    <TouchableOpacity
                        onPress={this.createOrder}
                    >
                            <View style={{backgroundColor:'#3F51B5', paddingVertical:8, paddingHorizontal:16, borderRadius:3, elevation:1,justifyContent:'center'}}>
                                <Text style={{color:'#fff', textAlign:'center'}}>Отправить еще раз</Text>
                            </View>
                    </TouchableOpacity>
                </View>
            )
        }
        

    }
}

const mapStateToProps = state => {
    return {
        cart: state.cart.cart,
        loading: state.order.loading,
        success: state.order.success,
        error: state.order.error
    }
}
const mapDispatchToProps = (dispatch, payload) => {
    return{
        toggleSearchPanel: (payload) => dispatch(toggleSearchPanel(payload)),
        setCart: (payload) => dispatch(setCart(payload)),
        createOrder: (payload) => dispatch(createOrder(payload)),
        navigate: (payload) => dispatch(navigate(payload)),
        
    } 
}
export default connect(mapStateToProps, mapDispatchToProps)(SuccessOrder)