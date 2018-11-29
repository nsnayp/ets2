import React, { Component, } from "react";
import { connect } from 'react-redux';

import {   Dimensions,Modal, Animated} from 'react-native';

import {setVisible} from '../actions/PhotoViewer';

import PhotoViewer from './PhotoViewer';


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
             <PhotoViewer  images={this.props.images} activeImage={this.props.activeImage}></PhotoViewer>

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