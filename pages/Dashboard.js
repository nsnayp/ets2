import * as React from 'react';
import { Text, View,Button, TouchableOpacity, Dimensions, TextInput, Animated, Easing, Keyboard, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import {toggleSearchPanel} from '../actions';
import { Feather,MaterialIcons,FontAwesome } from '@expo/vector-icons';


class Dashboard extends React.Component {

    constructor(props) {
        super(props)
        //console.log('dash', this.props)
    }


    render() {
 

        return (
            <View style={{flexDirection:'column', justifyContent:'flex-start', alignItems:'center', flex:1, paddingHorizontal:8, paddingVertical:8}}>
                



                <View style={{flexDirection:'row', justifyContent:"space-between", width:'100%',backgroundColor:'#fff', elevation:1, paddingVertical:8, paddingHorizontal:16}}>
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
                            <Feather name="phone" size={24} color="green" />
                        </View>
                    </View>
                
                </View>


                <Text style={{fontSize:15, padding:24}}>Привет, это наша первая версия</Text>


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
    } 
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)