import * as React from 'react';
import { Text, View, TouchableOpacity, Dimensions, TextInput, Animated, Easing, Keyboard, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

import { connect } from 'react-redux';
import { toggleSearchPanel, onInput, removeText ,navigate, setSearchText,fetchSearchResult,offersSetProductId,setOffers } from '../../actions/index'


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const HEADER_HEIGHT = 56;
const ICON_WIDTH = HEADER_HEIGHT
const HEDER_TITLE_WIDTH = screenWidth - HEADER_HEIGHT - HEADER_HEIGHT - 16
const SEARCH_WIDTH = HEDER_TITLE_WIDTH + ICON_WIDTH + ICON_WIDTH

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
            }
        });
        this.searchPanel.focus()
    }

    hideSearchPanel = (e) => {
        Animated.timing(this.state.widthSP, {
            toValue: 0,
            duration: 250,
            easing: Easing.linear()
        }).start((done) => {
            if (done.finished) {
                Keyboard.dismiss()
            }
        });
    }

    renderBackButton=()=>{

        

        const backButtonScreen = (this.props.screens[this.props.currentScreen].backButtonScreen)? this.props.screens[this.props.currentScreen].backButtonScreen : 'SearchResult';
        console.log(this.props.screens[this.props.currentScreen])
        if(this.props.screens[this.props.currentScreen].backButtonVisible){
            return(
            <Animated.View style={{  }}>
                <TouchableOpacity onPress={() => { 
                        
                        this.props.toggleSearchPanel(false); 
                        this.props.navigate(backButtonScreen) ;
                        this.props.offersSetProductId(null);
                        this.props.setOffers(null);
                    
                    }}>
                    <View style={[ {width: HEADER_HEIGHT, height: HEADER_HEIGHT, justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }]}>
                        <Feather name="arrow-left" size={20} color="#fff" style={{}} />
                    </View>
                </TouchableOpacity>
            </Animated.View>
            )
        }
        return (
            <View style={{width:16, height:HEADER_HEIGHT}}></View>
        )
    }

    findNumber=()=>{
        requestAnimationFrame(() => {
            this.props.offersSetProductId(null);
            this.props.setOffers(null);
            this.props.fetchSearchResult(this.props.text);

            this.props.removeText();
            this.props.toggleSearchPanel(false);
            this.props.navigate('SearchResult', {headerText:'Поиск '+this.props.text})
        })
    }

    render() {
        
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
            inputRange: [0, 0.4, 1],
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

                    <Animated.View style={[styles.titleWrap, { left: titleLeft, alignItems:'center' }]}>
                        
                        {this.renderBackButton()}
                        
                        <Text style={ [styles.titleText] }>{ this.props.screens[this.props.currentScreen].headerText}</Text>

                    </Animated.View>

                    <View style={styles.rightPanel}>

                        <View style={{ width: '100%', position: 'relative', alignItems: 'flex-end', justifyContent: 'center', height: HEADER_HEIGHT, }}>
                            <Animated.View style={[styles.searchPanelWrap, { opacity: searchWrapOpacity, width: searchWidth, borderRadius: borderRadiusWrap, transform:[{scale:scale}], overflow:'hidden' }]}>

                                <Animated.View style={{ backgroundColor: '#fff', borderRadius: 4, opacity: searchOpacity }}>
                                    <TextInput
                                        returnKeyType="search"
                                        multiline={false}
                                        value={this.props.text}
                                        onChangeText={(text) => { this.props.onInput(text) }}
                                        onSubmitEditing={(event) => {
                                            this.findNumber()
                                        }}
                                        ref={el => { this.searchPanel = el; }}
                                        underlineColorAndroid='rgba(0,0,0,0)'
                                        placeholder='Поиск по номеру'
                                        style={styles.textInput}></TextInput>
                                </Animated.View>

                                <Animated.View style={{ position: 'absolute', left: 0, opacity: searchOpacity}}>
                                    <TouchableOpacity onPress={() => { this.props.toggleSearchPanel(false) }}>
                                        <View style={styles.iconWrap}>
                                            <Feather name="arrow-left" size={20} color="#999" style={{}} />
                                        </View>
                                    </TouchableOpacity>
                                </Animated.View>

                                <Animated.View style={{ position: 'absolute', right: HEADER_HEIGHT, zIndex: 10 ,opacity: searchOpacity}}>
                                    <TouchableOpacity onPress={this.props.removeText}>
                                        <View style={styles.iconWrap}>
                                            <Feather name="x" size={20} color="#999" style={{}} />
                                        </View>
                                    </TouchableOpacity>
                                </Animated.View>

                                <Animated.View style={{ position: 'absolute', right: 0, zIndex: 10 ,opacity: searchOpacity,backgroundColor:'#eee'}}>
                                    <TouchableOpacity onPress={this.findNumber}>
                                        <View style={styles.iconWrap}>
                                            <Feather name="search" size={20} color="#999" style={{}} />
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
                        
                    <View style={{width:16, height:HEADER_HEIGHT}}></View>
                        

                    </View>


                    {/* <View style={{ width: HEADER_HEIGHT }}>
                        <TouchableOpacity onPress={()=>{this.props.navigate('Cart')}}>
                            <View style={{ width: HEADER_HEIGHT, height: HEADER_HEIGHT, justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                <Feather name="mail" size={20} color="#fff" style={{}} />
                            </View>
                        </TouchableOpacity>
                    </View> */}


                </View>


            </View>
        )

    }
}

const mapStateToProps = state => {
    return {
        searchPanelShown: state.app.searchPanelShown,
        text: state.app.text,
        screenParams : state.app.screenParams,
        currentScreen:state.app.currentScreen,
        screens : state.screens.screens,
    }
}

const mapDispatchToProps = (dispatch, payload,params) => {
    return {
        toggleSearchPanel: (payload) => dispatch(toggleSearchPanel(payload)),
        onInput : (payload) => dispatch(onInput(payload)),
        removeText : () => dispatch(removeText()),
        navigate : (payload,params) => dispatch(navigate(payload,params)),
        setSearchText: (payload) => dispatch(setSearchText(payload)),
        fetchSearchResult:(payload)=>{dispatch(fetchSearchResult(payload))},
        offersSetProductId: (payload) => dispatch(offersSetProductId(payload)),
        setOffers:(payload)=> dispatch(setOffers(payload)),
    }
}


styles = StyleSheet.create({
    header: {
        width: screenWidth, backgroundColor: '#3F51B5', paddingTop: 24, elevation: 5, height: 80
    },
    wrap: {
        width: '100%', paddingVertical: 0, paddingLeft: 0, flexDirection: 'row', justifyContent: 'space-between', position: 'relative', alignItems: 'center', alignContent: 'stretch'
    },
    titleWrap: {
        position: 'relative', width: HEDER_TITLE_WIDTH, flexDirection:'row'
    },
    titleText: { color: '#fff', fontSize: 16 },
    rightPanel: { position: 'relative', width: HEADER_HEIGHT, height: HEADER_HEIGHT, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: HEADER_HEIGHT },
    searchPanelWrap: { position: 'relative', backgroundColor: '#fff' },
    textInput: { width: '100%', backgroundColor: 'transparent', fontSize: 15, paddingVertical: 6, borderBottomWidth: 0, borderRadius: 4, borderWidth: 0, paddingHorizontal: 16, paddingHorizontal: HEADER_HEIGHT },
    iconWrap: { padding: 10, flexDirection: 'column', alignItems: 'center', width: HEADER_HEIGHT }
})



export default connect(mapStateToProps, mapDispatchToProps)(Header)