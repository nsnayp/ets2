import * as React from 'react';
import { Text, View,Button, TouchableOpacity, Dimensions, TextInput, Animated, Easing, Keyboard, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import {toggleSearchPanel} from '../actions';

class Dashboard extends React.Component {

    constructor(props) {
        super(props)
        //console.log('dash', this.props)
    }


    render() {
 

        return (
            <View style={{flexDirection:'column', justifyContent:'center', alignContent:'center', alignItems:'center', flex:1}}>
                <Text style={{fontSize:15}}>Привет, это наша первая версия</Text>
                
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