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
            <View style={{flexDirection:'column', justifyContent:'flex-start', alignItems:'center', flex:1, paddingHorizontal:8, paddingVertical:8,backgroundColor:'#fff'}}>
                {/* <View style={{flexDirection:'row', justifyContent:"space-between", width:'100%',backgroundColor:'#fff', elevation:1, paddingVertical:8, paddingHorizontal:16}}>
                    <View style={{flexDirection:'row', alignContent:'center',alignItems:'center'}}>
                        <View>
                            <Image source={{uri:'http://etsgroup.ru/img/6952.jpg'}} style={{width:65, height:65, borderRadius:100}}></Image>
                        </View>
                        <View style={{marginLeft:16}}>
                            <Text style={{fontSize:17, color:'#999'}}>Михеев Алексей</Text>
                            <Text style={{fontSize:13, color:'#424242'}}>skype: mixeu</Text>
                            <Text style={{fontSize:13, color:'#424242'}}>email: miheev@etsgroup.ru</Text>  
                        </View>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <View style={{alignSelf:'center', justifyContent:"flex-end", padding:16}}>
                            <Feather name="phone" size={24} color="#8BC34A" />
                        </View>
                    </View>
                
                </View>
                <Text style={{fontSize:15, padding:24}}>Привет, это наша первая версия</Text>

                <TouchableOpacity onPress={()=>{this.props.setCart("{}")} }>
                    <View style={{padding:16}}>
                        <Text>Очистить корзину</Text>
                    </View>
                </TouchableOpacity> */}
                <Text style={{fontSize:17, marginTop:42, marginBottom:16}}>Etsgroup теперь в твоем смартфоне!</Text>
                <TouchableOpacity 
                    onPress={()=>this.props.toggleSearchPanel(true)}
                >
                    <View style={{backgroundColor:'#1976D2', paddingHorizontal:16, paddingVertical:8}}>
                        <Text style={{color:'#fff'}}>Начать поиск</Text>
                    </View>
                </TouchableOpacity>
                <Image source={{uri:'http://1024x.net/wallpapers/45t/Worn-Out_Engine_Heart.jpg'}} style={{width:'70%', height:'70%' }}></Image>

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