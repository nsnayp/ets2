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
            <View>
                <Text>Hello, its dashboard</Text>
                <Image source={{uri:'http://etsgroup.ru/img/shuffler.jpg'}} style={{width:100, height:100}}></Image>
                <Button title='erert' onPress={()=>{this.props.toggleSearchPanel(true)}}></Button>
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