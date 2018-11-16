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
                <Text>{JSON.stringify(this.props.cart)}</Text>

            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        cart: state.cart.cart
    }
}
const mapDispatchToProps = (dispatch, payload) => {
    return{
        toggleSearchPanel: (payload) => dispatch(toggleSearchPanel(payload)),
    } 
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)