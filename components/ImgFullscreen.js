import React, { Component, } from "react";
import { connect } from 'react-redux';

import {   Dimensions,Modal, Animated,Text,TouchableOpacity, View} from 'react-native';

import {setVisible} from '../actions/PhotoViewer';
import { Feather,MaterialIcons,FontAwesome } from '@expo/vector-icons';
import PhotoViewer from './PhotoViewer';
import ImageViewer from 'react-native-image-zoom-viewer';

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;

class ImgFullscreen extends Component {
constructor(props) {
    super(props);
    this.state={
        indexImg : 0,
        translateY : new Animated.Value(0),
        translateX : new Animated.Value(0),
        offset: screenWidth*this.props.activeImage
    }

}



render=()=>{ 

    return(
        <Modal
            animationType ="fade"
            onRequestClose={ ()=>{ this.props.setVisible(false)  } }
            transparent={true}
            visible={this.props.visible}
            
            > 
            {/*  <PhotoViewer  images={this.props.images} activeImage={this.props.activeImage}></PhotoViewer> */}
             <ImageViewer 
             imageUrls={this.props.images} 
             index={this.props.activeImage}
             enableSwipeDown
             onSwipeDown={()=>{  this.props.setVisible(false)} }
             swipeDownThreshold={20}
             renderHeader={
                 ()=>{
                     return(
                        <TouchableOpacity onPress={() => {this.props.setVisible(false)}}>
                            <View style={[ {width: 56, height: 56, justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }]}>
                                <Feather name="arrow-left" size={20} color="#fff" style={{}} />
                            </View>
                        </TouchableOpacity>
                     )
                 }
             }
            />
        </Modal>
    )
}


}




const mapStateToProps = state => {
    
    return {
        visible: state.photo.visible,
        images: state.photo.images,
        activeImage:state.photo.activeImage
    }
}
const mapDispatchToProps = (dispatch, payload) => {
    return{
        setVisible: (payload) => dispatch(setVisible(payload)),
    } 
}
export default connect(mapStateToProps, mapDispatchToProps)(ImgFullscreen)