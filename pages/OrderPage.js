import * as React from 'react';
import { Text, View, ActivityIndicator,FlatList,TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';


import {navigate} from '../actions';
import {fetchOrders,setActiveOrder} from '../actions/OrdersActions';
import {prettyNumber} from '../helpers/helpers';

class OrderPage extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        this.props.fetchOrders()
    }

    renderItem=(item, index)=>{

        let sum = 0;

        for(k in item.orderList){
            sum+=item.orderList[k].sum
        }

        return(
            <TouchableOpacity
                onPress={()=>{
                    this.props.setActiveOrder(item);
                    this.props.navigate('OrderOnePage', {headerText:'Заказ #'+item.id,backButtonVisible:true,backButtonScreen:'OrderPage'})
                }}
            >
                <View key={index} style={{paddingHorizontal:16, paddingVertical:8, backgroundColor:'#fff', borderBottomColor:'#eee', borderBottomWidth:1}}>
                    <Text style={{color:'#37474F'}}>Заказ от {item.date} на сумму {prettyNumber(sum)} ₽</Text>
                    <Text style={{color:'#607D8B'}}>Кол-во позиций: {item.orderList.length}</Text>
                    <Text style={{color:'#607D8B'}}>Комментарий: {item.comment}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const {loading, error, orders} = this.props;
        if(loading){
            return(
                <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                    <ActivityIndicator size="large"></ActivityIndicator>
                </View>
            )
        }else if(!loading&&orders){
            return (
                <View style={{flex:1, backgroundColor:'#fff'}}>
                
                    <FlatList
                        data={orders}
                        renderItem={({item, index}) =>  this.renderItem(item,index) }  
                        keyExtractor={(item, index) => index.toString()} 
                        initialNumToRender={15}
                        refreshing={false}
                    >
                    
                    </FlatList>
                </View>
            )
        }else if(!loading&&error){
            return(
                <View style={{flexDirection:'column', justifyContent:'flex-start', alignItems:'center', flex:1, paddingHorizontal:8, paddingVertical:8,backgroundColor:'#fff'}}>
                    <Text style={{color:'#37474F', fontSize:18, marginTop:42, marginBottom:4}}>Ошибка</Text>
                    <Text style={{color:'#607D8B'}}>Возможно, нет подключения к интернету</Text>
                </View>
            )
        }
        
       
    }
}

const mapStateToProps = state => {
    return {
        loading: state.orders.loading,
        error: state.orders.error,
        orders: state.orders.orders,
    }
}
const mapDispatchToProps = (dispatch, payload) => {
    return{
        fetchOrders: () => dispatch(fetchOrders()),
        setActiveOrder: (payload) => dispatch(setActiveOrder(payload)),
        navigate : (payload,params) => dispatch(navigate(payload,params)),
    } 
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderPage)