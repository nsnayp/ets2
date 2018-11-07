import * as React from 'react';
import { Text, View, TouchableOpacity, Dimensions, TextInput, Animated, Easing, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

import { connect } from 'react-redux';
import {toggleSearchPanel} from '../../actions/index'


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const HEADER_HEIGHT = 56;
const ICON_WIDTH = HEADER_HEIGHT
const HEDER_TITLE_WIDTH = screenWidth - HEADER_HEIGHT - HEADER_HEIGHT - 16
const SEARCH_WIDTH = HEDER_TITLE_WIDTH + ICON_WIDTH

class Header extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            widthSP: new Animated.Value(0),
        }
    }
    componentWillReceiveProps(props){
        if(props.searchPanelShown){
            this.openSearchPanel()
        }else{
            this.hideSearchPanel()
        }
    }
    openSearchPanel = (e) => {
        Animated.timing(this.state.widthSP, {
            toValue: 1,
            duration: 300,
            easing: Easing.linear(),

        }).start((done) => {
            if (done.finished) {
                this.setState({ visibilityIconSearch: false })
            }
        });
        this.searchPanel.focus()
    }

    hideSearchPanel = (e) => {
        Animated.timing(this.state.widthSP, {
            toValue: 0,
            duration: 300,
            easing: Easing.linear()
        }).start((done) => {
            if (done.finished) {
                this.setState({ visibilityIconSearch: true })
                Keyboard.dismiss()

            }
        });
    }

    render() {

        let searchWidth = this.state.widthSP.interpolate({
            inputRange: [0, 1],
            outputRange: [0, SEARCH_WIDTH]
        });

        let searchIconTop = this.state.widthSP.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 56]
        });

        let searchOpacity = this.state.widthSP.interpolate({
            inputRange: [0, 0.3, 1],
            outputRange: [0, 0, 1]
        });
        let searchIconOpacity = this.state.widthSP.interpolate({
            inputRange: [0, 0.1, 1],
            outputRange: [1, 0.1, 0]
        });
        let titleLeft = this.state.widthSP.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -HEDER_TITLE_WIDTH]
        });

        return (
            <View style={{ width: screenWidth, backgroundColor: '#3F51B5', paddingTop: 24, elevation: 5, height: 80 }}>
                <View style={{ width: '100%', paddingVertical: 0, paddingLeft: 16, flexDirection: 'row', justifyContent: 'space-between', position: 'relative', alignItems: 'center', alignContent: 'stretch' }}>

                    <Animated.View style={{ position: 'relative', left: titleLeft, width: HEDER_TITLE_WIDTH }}>
                        <Text style={{ color: '#fff', fontSize: 16 }}>ETS GROUP</Text>
                    </Animated.View>
                    <Animated.View style={{ position: 'relative', width: HEADER_HEIGHT, height: HEADER_HEIGHT, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: HEADER_HEIGHT }}>

                        <View style={{ width: '100%', position: 'relative', alignItems: 'flex-end', justifyContent: 'center', height: HEADER_HEIGHT, }}>
                            <Animated.View style={{ width: searchWidth, position: 'relative', opacity: searchOpacity,borderRadius: 4, }}>
                                <TextInput returnKeyType="search" multiline={false} value={this.state.searchText} onChangeText={(text) => { this.setState({ searchText: text }) }} onSubmitEditing={(event) => this.findOem(event.nativeEvent.text)} ref={el => { this.searchPanel = el; }} underlineColorAndroid='rgba(0,0,0,0)' placeholder='Поиск по номеру' style={{ width: '100%', backgroundColor: '#fff', fontSize: 15, paddingVertical: 6, borderBottomWidth: 0, borderRadius: 4, borderWidth: 0, paddingHorizontal: 16, paddingHorizontal:  HEADER_HEIGHT }}></TextInput>

                                <View style={{ position: 'absolute', left: 0 }}>
                                    <TouchableOpacity onPress={()=>{this.props.toggleSearchPanel(false)}}>
                                        <View style={{ padding: 10, flexDirection: 'column', alignItems: 'center', width: HEADER_HEIGHT }}>
                                            <Feather name="arrow-left" size={20} color="#999" style={{}} />
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ position: 'absolute', right: 0, zIndex: 10 }}>
                                    <TouchableOpacity onPress={() => { this.setState({ searchText: '' }) }}>
                                        <View style={{ padding: 10, flexDirection: 'column', alignItems: 'center', width: HEADER_HEIGHT }}>
                                            <Feather name="x" size={20} color="#999" style={{}} />
                                        </View>
                                    </TouchableOpacity>
                                </View>

                            </Animated.View>

                            <Animated.View style={{ position: 'absolute', right: 0, top: searchIconTop, zIndex: 10, opacity: searchIconOpacity }}>
                                <View>
                                    <TouchableOpacity onPress={()=>{this.props.toggleSearchPanel(true)}}>
                                        <View style={{ width: HEADER_HEIGHT, height: HEADER_HEIGHT, justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                                            <Feather name="search" size={20} color="#fff" style={{}} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </Animated.View>

                        </View>

                    </Animated.View>



                    <View style={{ width: HEADER_HEIGHT }}>
                        <TouchableOpacity>
                            <View style={{ width: HEADER_HEIGHT, height: HEADER_HEIGHT, justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                                <Feather name="shopping-cart" size={20} color="#fff" style={{}} />
                            </View>
                        </TouchableOpacity>
                    </View>
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

export default connect(mapStateToProps, {toggleSearchPanel})(Header)