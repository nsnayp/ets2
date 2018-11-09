import * as React from 'react';
import { Text, View, TouchableOpacity, Dimensions, TextInput, Animated, Easing, Keyboard, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

import { connect } from 'react-redux';
import { toggleSearchPanel } from '../../actions/index'


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
    componentWillReceiveProps(props) {
        if (props.searchPanelShown) {
            this.openSearchPanel()
        } else {
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
        console.log('header props', this.props)


        let searchWidth = this.state.widthSP.interpolate({
            inputRange: [0, 0.3, 1],
            outputRange: [56, 56, SEARCH_WIDTH]
        });

        let searchIconTop = this.state.widthSP.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 56]
        });

        let searchOpacity = this.state.widthSP.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 0, 1]
        });
        let searchWrapOpacity = this.state.widthSP.interpolate({
            inputRange: [0,  1],
            outputRange: [0,  1]
        });
        let scale = this.state.widthSP.interpolate({
            inputRange: [0, 0.3, 1],
            outputRange: [0, 1, 1]
        });


        let borderRadiusWrap = this.state.widthSP.interpolate({
            inputRange: [0, 0.3, 0.5, 1],
            outputRange: [60, 50, 6, 4]
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
            <View style={styles.header}>
                <View style={styles.wrap}>

                    <Animated.View style={[styles.titleWrap, { left: titleLeft }]}>
                        <Text style={styles.titleText}>ETS GROUP</Text>
                    </Animated.View>

                    <View style={styles.rightPanel}>

                        <View style={{ width: '100%', position: 'relative', alignItems: 'flex-end', justifyContent: 'center', height: HEADER_HEIGHT, }}>
                            <Animated.View style={[styles.searchPanelWrap, { opacity: searchWrapOpacity, width: searchWidth, borderRadius: borderRadiusWrap, transform:[{scale:scale}] }]}>

                                <Animated.View style={{ backgroundColor: '#fff', borderRadius: 4, opacity: searchOpacity }}>
                                    <TextInput
                                        returnKeyType="search"
                                        multiline={false}
                                        value={this.state.searchText}
                                        onChangeText={(text) => { this.setState({ searchText: text }) }}
                                        onSubmitEditing={(event) => this.findOem(event.nativeEvent.text)}
                                        ref={el => { this.searchPanel = el; }}
                                        underlineColorAndroid='rgba(0,0,0,0)'
                                        placeholder='Поиск по номеру'
                                        style={styles.textInput}></TextInput>
                                </Animated.View>

                                <Animated.View style={{ position: 'absolute', left: 0, opacity: searchOpacity }}>
                                    <TouchableOpacity onPress={() => { this.props.toggleSearchPanel(false) }}>
                                        <View style={styles.iconWrap}>
                                            <Feather name="arrow-left" size={20} color="#999" style={{}} />
                                        </View>
                                    </TouchableOpacity>
                                </Animated.View>

                                <Animated.View style={{ position: 'absolute', right: 0, zIndex: 10 ,opacity: searchOpacity}}>
                                    <TouchableOpacity onPress={() => { this.setState({ searchText: '' }) }}>
                                        <View style={styles.iconWrap}>
                                            <Feather name="x" size={20} color="#999" style={{}} />
                                        </View>
                                    </TouchableOpacity>
                                </Animated.View>

                            </Animated.View>

                            <Animated.View style={{ position: 'absolute', right: 0, top: searchIconTop, zIndex: 10, opacity: searchIconOpacity }}>
                                <View>
                                    <TouchableOpacity onPress={() => { this.props.toggleSearchPanel(true) }}>
                                        <View style={{ width: HEADER_HEIGHT, height: HEADER_HEIGHT, justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                            <Feather name="search" size={20} color="#fff" style={{}} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </Animated.View>

                        </View>

                    </View>



                    <View style={{ width: HEADER_HEIGHT }}>
                        <TouchableOpacity>
                            <View style={{ width: HEADER_HEIGHT, height: HEADER_HEIGHT, justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
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
        searchPanelShown: state.app.searchPanelShown
    }
}

const mapDispatchToProps = (dispatch, payload) => {
    return {
        toggleSearchPanel: (payload) => dispatch(toggleSearchPanel(payload)),
    }
}


styles = StyleSheet.create({
    header: {
        width: screenWidth, backgroundColor: '#3F51B5', paddingTop: 24, elevation: 5, height: 80
    },
    wrap: {
        width: '100%', paddingVertical: 0, paddingLeft: 16, flexDirection: 'row', justifyContent: 'space-between', position: 'relative', alignItems: 'center', alignContent: 'stretch'
    },
    titleWrap: {
        position: 'relative', width: HEDER_TITLE_WIDTH
    },
    titleText: { color: '#fff', fontSize: 16 },
    rightPanel: { position: 'relative', width: HEADER_HEIGHT, height: HEADER_HEIGHT, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: HEADER_HEIGHT },
    searchPanelWrap: { position: 'relative', backgroundColor: '#fff' },
    textInput: { width: '100%', backgroundColor: 'transparent', fontSize: 15, paddingVertical: 6, borderBottomWidth: 0, borderRadius: 4, borderWidth: 0, paddingHorizontal: 16, paddingHorizontal: HEADER_HEIGHT },
    iconWrap: { padding: 10, flexDirection: 'column', alignItems: 'center', width: HEADER_HEIGHT }
})



export default connect(mapStateToProps, mapDispatchToProps)(Header)