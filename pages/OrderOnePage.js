import * as React from 'react';
import { Text, View, FlatList,BackHandler } from 'react-native';
import { connect } from 'react-redux';
import {navigate} from '../actions';
import {prettyNumber} from '../helpers/helpers';

class OrderOnePage extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigate('OrderPage') ;
            return true;
        });
    }

    renderItem=(item, index)=>{
        return(
            <View key={index} style={{paddingHorizontal:16, paddingVertical:8, backgroundColor:'#fff', borderBottomColor:'#eee', borderBottomWidth:1}}>
                <Text style={{color:'#37474F'}}>{item.brand} {item.num}</Text>
                <Text style={{color:'#607D8B'}}>{item.prd_name}</Text>
                <Text style={{color:'#607D8B'}}>{prettyNumber(item.price)} ₽, {item.qty} шт</Text>
            </View>
        )
    }

    render() {
        const {activeOrder} = this.props;
        //console.log(activeOrder)
        
            return (
                <View style={{flex:1, backgroundColor:'#fff'}}>
                    
                     <FlatList
                        data={activeOrder.orderList}
                        renderItem={({item, index}) =>  this.renderItem(item,index) }  
                        keyExtractor={(item, index) => index.toString()} 
                        initialNumToRender={15}
                        refreshing={false}
                    >
                    
                    </FlatList> 
                </View>
            )
        
       
    }
}

const mapStateToProps = state => {
    return {
        activeOrder: state.orders.activeOrder,
    }
}
const mapDispatchToProps = (dispatch, payload) => {
    return{
        navigate : (payload,params) => dispatch(navigate(payload,params)),
    } 
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderOnePage)