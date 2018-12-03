import * as React from 'react';
import { Text, View, Button, Image} from 'react-native';
import { connect } from 'react-redux';
import {toggleSearchPanel} from '../actions';

class Orders extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
         return (
            <View style={{flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:20}}>Этот раздел в разработке!</Text>
                <Text>Есть пожелания? Пиши на ivanov@etsgroup.ru</Text>
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
export default connect(mapStateToProps, mapDispatchToProps)(Orders)