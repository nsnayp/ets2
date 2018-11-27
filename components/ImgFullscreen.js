import React, { Component, } from "react";
import { connect } from 'react-redux';

import { View , ScrollView, Dimensions,Modal,Text,TouchableNativeFeedback,PanResponder, Animated, Easing} from 'react-native';
import ScaledImage from './ScaledImage';

import {setVisible} from '../actions/PhotoViewer';


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

renderScaledImage=(image,count)=>{

    return(
        <View key={image.src+'1'} style={{width:screenWidth, height:'100%', flexDirection:'column',justifyContent:'center' }}>
            <ScaledImage width={screenWidth} uri={image.srcBig} />
        </View>
    )
}

getDirection = ({ moveX, moveY, dx, dy}) => {
	const draggedDown = dy > 20;
	const draggedUp = dy < -20;
	const draggedLeft = dx < -20;
	const draggedRight = dx > 20;

	let dragDirection = '';
  
	if (draggedDown || draggedUp) {
	  if (draggedDown) dragDirection += 'dragged down '
	  if (draggedUp) dragDirection +=  'dragged up ';
	}
  
	if (draggedLeft || draggedRight) {
	  if (draggedLeft) dragDirection += 'dragged left '
      if (draggedRight) dragDirection +=  'dragged right ';
      return false;
	}
  	if (dragDirection) return true;
}

getDirection1=(g,i)=>{
    console.log(g,i)
    /*if(Math.abs(dy)>Math.abs(dx) ){
        console.log('false',Math.abs(dy),Math.abs(dx))
        return false
        
    }
    console.log('true',Math.abs(dy),Math.abs(dx),dy,dx)
    return true*/
    return true
}

_panResponder = PanResponder.create({
    onMoveShouldSetResponderCapture: (e,g) => true,
    onMoveShouldSetPanResponderCapture: (e,g) => true,
    onResponderTerminationRequest: (e,g) => true,

    onStartShouldSetPanResponder: (e,g)=> false,
    onMoveShouldSetPanResponder:(e, g) => this.getDirection1(g),
	onPanResponderMove:(e, gest) => {
        var x = Math.abs(gest.dx)
        var y = Math.abs(gest.dy)

        if(y>x){
            Animated.event([
                null , 
                {dy: this.state.translateY},
            ])(e, gest)
        }
	},

    onPanResponderRelease: (e, gest) => {
        //console.log(gest)
        Animated.timing(this.state.translateY, {
          toValue: 0 ,
		  duration: 100,
		
        }).start();
    }
});

componentWillReceiveProps=()=>{
    
}

componentDidMount=()=>{
    
}

componentDidUpdate=()=>{
    if(this.scrollView1){
        var inst = this
        setTimeout(()=>{
            inst.scrollView1.scrollTo({x: screenWidth*inst.props.activeImage, y: 0, animated: false});
        },100)
        
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
 
            <ScrollView
                onScroll= {function(event) {
                    console.log(event.nativeEvent.contentOffset.x);
                }}
                pagingEnabled ref={el => { this.scrollView1 = el }}  
                horizontal  
                style={{ width:'100%', height:'100%', backgroundColor:'#000', flexDirection:'row'}}  >
                    {Object.values(this.props.images).map( (image,index) => this.renderScaledImage(image,index))}
            </ScrollView>
                
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