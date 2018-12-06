import * as React from 'react';
import { Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {toggleSearchPanel} from '../actions';
import {setCustomerId} from '../actions/AppWrapActions';

class Settings extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
         return (
            <View>
                <Text>Hello, its Settings</Text>

                <TouchableOpacity
                    onPress={()=>{
                        this.props.setCustomerId(null)
                    }}
                >
                        <View style={{backgroundColor:'#3F51B5', paddingVertical:16, paddingHorizontal:32, borderRadius:3, elevation:1}}>
                            <Text style={{color:'#fff', textAlign:'center'}}>Выйти</Text>
                        </View>
                </TouchableOpacity>
                
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
        setCustomerId: (payload) => dispatch(setCustomerId(payload)),
    } 
}
export default connect(mapStateToProps, mapDispatchToProps)(Settings)