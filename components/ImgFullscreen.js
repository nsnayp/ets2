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
        translateX : new Animated.Value(0)
    }

}

renderScaledImage=(image,count)=>{
    console.log(count)
    const scale = this.state.translateY.interpolate({
		inputRange: [-300, 0],
		outputRange: [0.8, 1],
		extrapolate: 'clamp',
    });
    var plus = Math.round(screenWidth*count)

    return(
        <Animated.View key={image.src+'1'} style={{width:screenWidth, height:'100%', flexDirection:'column',justifyContent:'center' }}>
            <ScaledImage width={screenWidth} uri={image.src} />
        </Animated.View>
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
	}
  	if (dragDirection) return dragDirection;
}

_panResponder = PanResponder.create({
   // onMoveShouldSetResponderCapture: () => true,
    //onMoveShouldSetPanResponderCapture: () => true,
    onResponderTerminationRequest: () => false,
    onStartShouldSetPanResponder: ()=> true,
	onMoveShouldSetPanResponder:(evt, gestureState) => true,
	onPanResponderMove:(e, gest) => {
        var x = Math.abs(gest.dx)
        var y = Math.abs(gest.dy)
        let newGest = {dx:gest.dx};


        if(y>x){
            Animated.event([
                null , 
                {dy: this.state.translateY},
            ])(e, gest)
        }else{

            newGest.dx = ( (this.state.indexImg) * -screenWidth) + gest.dx
            console.log('ndx',newGest.dx, gest.dx, gest.moveX,this.state.indexImg)
            Animated.event([
                null , 
                {dx: this.state.translateX},
            ])(e, newGest)
        }
        
	},


    onPanResponderRelease: (e, gest) => {
        //console.log(gest)
        Animated.timing(this.state.translateY, {
          toValue: 0 ,
		  duration: 100,
		
        }).start();



        let toVal = 0

        if(gest.dx < -100){
            let _indexImg = this.state.indexImg+1;
            if(_indexImg>this.props.images.length-1){_indexImg=this.props.images.length-1}

            toVal = -screenWidth*_indexImg;
            this.setState({indexImg:_indexImg})

        }else if(gest.dx > 100){

            let _indexImg = this.state.indexImg-1;
            if(_indexImg<0){_indexImg=0}

            toVal = screenWidth*_indexImg;
            this.setState({indexImg:_indexImg})
        }

        Animated.timing(this.state.translateX, {
            toValue: toVal,
            duration: 100,
            
        }).start();

    }
});

renderModal=()=>{ 
    //console.log('images',this.props.images)
    if(this.props.visible){
        const w = screenWidth*this.props.images.length
    return(
        <Modal
            animationType ="fade"
                onRequestClose={ ()=>{ this.props.setVisible(false)  } }
                transparent={true}
                visible={this.props.visible}
            >
                <View style={{ width:screenWidth, height:screenHeight, zIndex:100, top:0, left:0, backgroundColor:'#000', position:'absolute', flexDirection:'row'}}  {...this._panResponder.panHandlers}>
                    <Animated.View  style={{ width:w, height:screenHeight,  flexDirection:'row',  transform: [{ translateY: this.state.translateY},{ translateX: this.state.translateX}]}}  >
                            {Object.values(this.props.images).map( (image,index) => this.renderScaledImage(image,index))}
                    </Animated.View>
                </View>
                
        </Modal>
    )}else{
        return null
    }
}

render() {
    return (
        this.renderModal()
    );

}
}




const mapStateToProps = state => {
    
    return {
        visible: state.photo.visible,
        images: state.photo.images,
    }
}
const mapDispatchToProps = (dispatch, payload) => {
    return{
        setVisible: (payload) => dispatch(setVisible(payload)),
    } 
}
export default connect(mapStateToProps, mapDispatchToProps)(ImgFullscreen)