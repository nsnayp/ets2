import * as React from 'react';
import { Text, View, Button, Image } from 'react-native';
import { connect } from 'react-redux';
import {toggleSearchPanel} from '../actions';

class Cart extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
         return (
            <View>
                <Text>Hello, its Cart</Text>

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
export default connect(mapStateToProps, mapDispatchToProps)(Cart)