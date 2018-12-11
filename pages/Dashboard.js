import * as React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import {toggleSearchPanel,setCart} from '../actions';
import { Feather,MaterialIcons,FontAwesome } from '@expo/vector-icons';

class Dashboard extends React.Component {

    constructor(props) {
        super(props)
        //console.log('dash', this.props)
    }

    render() {

        return (

<View style={{flexDirection:'column', justifyContent:'flex-start', alignItems:'center', flex:1, paddingHorizontal:0, paddingVertical:8,backgroundColor:'#fff'}}>
                <Image source={{uri:'http://etsgroup.ru/old1.jpg'}} style={{width:'100%', height:'50%'}}></Image>
                <View style={{flexDirection:'column', justifyContent:'space-between', alignItems:'center', marginTop:24}}>
                <Text style={{color:'#37474F', fontSize:18,  marginBottom:4}}>ETS GROUP в твоем смартфоне!</Text>
                <Text style={{color:'#607D8B'}}>Мы рады Вас видеть!</Text>

                <TouchableOpacity
                   onPress={()=>this.props.toggleSearchPanel(true)}
                >
                        <View style={{backgroundColor:'#3F51B5', paddingVertical:8, paddingHorizontal:16, borderRadius:3, elevation:1, marginTop:16}}>
                            <Text style={{color:'#fff', textAlign:'center'}}>Начать поиск</Text>
                        </View>
                </TouchableOpacity>
                </View>
                
            </View>

        )

    }
}

const mapStateToProps = state => {
    return {
        searchPanelShown: state.app.searchPanelShown
    }
}
const mapDispatchToProps = (dispatch, payload) => {
    return{
        toggleSearchPanel: (payload) => dispatch(toggleSearchPanel(payload)),
        setCart: (payload) => dispatch(setCart(payload)),
        
    } 
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)