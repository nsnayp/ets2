import * as React from 'react';
import {
    Text,View, Button
} from 'react-native';
import { connect } from 'react-redux';
import {testChange,toggleSearchPanel} from '../actions'
import Header from '../components/Header/Header'

class AppAuth extends React.Component {

    constructor(props) {
        super(props)
        console.log(this.props)
    }

    _onPress=()=>{
        this.props.testChange('Hello')
    }

    render() {
        return (
            <View style={{flex:1, flexDirection:'column'}}>
                <Header></Header>
                <View style={{height:600}} onAccessibilityTap={()=>{this.props.toggleSearchPanel(false)}} >
                    <Button title='close search panel' onPress={()=>{this.props.toggleSearchPanel(false)}}></Button>
                    <Button title='open search panel' onPress={()=>{this.props.toggleSearchPanel(true)}}></Button>
                </View>
            </View>
        
            )
    }

}


const mapStateToProps = state => {
    return {
        searchPanelShown: state.test.searchPanelShown
    }
}

export default connect(mapStateToProps, {toggleSearchPanel})(AppAuth)