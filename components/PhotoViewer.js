import React, { Component } from 'react';
import { StyleSheet, Text, View,PanResponder,Animated,Dimensions,Image,Easing  } from 'react-native';
import ScaledImage from './ScaledImage';


const w = Dimensions.get("window").width;

export default class PhotoViewer extends Component {


state = {
  scaled:false,
  scale: new Animated.Value(1),
  left: new Animated.Value(-w),
  index:1,
  rtht:false,
  images:[]
};





componentWillMount() {

    this.setState({
        images: [...[''],...this.props.images],
        index:this.props.activeImage+1
    })


  this._panResponder = PanResponder.create({
    
    onMoveShouldSetResponderCapture: () => false, //не влияет на чайлд
    onStartShouldSetPanResponderCapture:()=>true, // если родитель то можно без этого, если чайлд то тру / похож на PreventDefault или stopPropagation
    onMoveShouldSetPanResponderCapture: () => true, //хз
    onMoveShouldSetPanResponder:()=>false,//не влияет на чайлд
    // думаю срабатывает при старте тача типа элементу сверху спустился тач от родителя событие, тип того
    onPanResponderGrant:(e,g)=>{
     
        //console.log('onPanResponderGrant')
    },
    //дичь запрашивает отмену события, в моем случае когда 2 пальца, эта хрень разрешает или запрещает
    onPanResponderTerminationRequest: (e, g) => false,
    //Сюда приходит перехваченный\запрещенный ивент
    onPanResponderTerminate:(e,g)=>{
      //console.log(e.nativeEvent)
    },

    onPanResponderMove: (e,g)=>{
      //console.log(e.nativeEvent)
      const touches = e.nativeEvent.touches;

      console.log(touches.length)
      if(touches.length==1){
        if(this.state.scaled){
         // console.log('смещение')
          //const a={dx:(g.dx-w)}
          //Animated.event([null, {dx: this.state.left}])(e,a)
        }else{
          const a={dx:(g.dx-w)}
          Animated.event([null, {dx: this.state.left}])(e,a)
        }
        
      }else if(touches.length==2){
        const a={scale : 2}
        Animated.event([null, {scale: this.state.scale}])(e,a);
        this.setState({scaled:true})
      }
      

    },
    onPanResponderRelease: (e, g) => {
    
      if(!this.state.scaled){
       // this.setState({rtht:true})

      
    //Предыдущее фото
      if(g.dx< (-w/2) || g.vx<-0.1){
        if(this.state.index<this.state.images.length-1){

          
          Animated.timing(this.state.left, {
            toValue: - w-w,
            duration: 115,
            easing: Easing.out(Easing.poly(2)),
          }).start(()=>{
            var inst = this
            setTimeout(()=>{
              inst.setState({index:inst.state.index+1},()=>{
                g.dx=-w
                Animated.event([null, {dx: inst.state.left}])(e,g)
              })
            },100)
           
            
          });




        }else{
          Animated.timing(this.state.left, {
            toValue: -w,
            duration: 115
          }).start()
        }

      }else if(g.dx> (w/2) || g.vx>0.1 ){

        if(this.state.index>1){

          

          Animated.timing(this.state.left, {
            toValue:  0,
            duration: 115,
            easing: Easing.out(Easing.poly(2))
          }).start(()=>{
            var inst = this
            setTimeout(()=>{
              inst.setState({index:inst.state.index-1},()=>{
                g.dx=-w
                Animated.event([null, {dx: inst.state.left}])(e,g)
              })
            },100)
            
            
          });

        }else{
          Animated.timing(this.state.left, {
            toValue: -w,
            duration: 115
          }).start()
        }
      }
      else{
        Animated.timing(this.state.left, {
          toValue:  -w,
          duration: 115,
          easing: Easing.easeIn
        }).start()
      }

    }

    }
  })

  

}


renderImage=(item,index)=>{
  if(index!=0){
    return(
      <Animated.View style={{backgroundColor:'transparent', width:'100%', height:'100%', justifyContent:'center', alignItems:'center', transform:[{scale:this.state.scale}] }}>
        <ScaledImage width={w} uri={item.srcBig} />
      </Animated.View>
    )
  }else{
    return null;
  }
}


renderItem =(item,index)=>{
  
  if(index == this.state.index || index == this.state.index-1 || index == this.state.index+1){
      return(
        <View key={index} style={{backgroundColor:'transparent', width:'100%', height:'100%', justifyContent:'center', alignItems:'center',padding:2,overflow:'hidden' }}>
         {this.renderImage(item,index)}
        </View>
      )

  }else{
    return null
  }
}




  render() {


    return (
        <View
        style={{flex:1, flexDirection:'row',backgroundColor:'#000'}}
        {...this._panResponder.panHandlers}
        >
          <Animated.View  style={{flex:1,width:'100%', height:'100%' ,   flexDirection:'row', position:'absolute',left:this.state.left}}>
            {this.state.images.map((item, index)=>{
              return this.renderItem(item,index)
            })}
          </Animated.View>
          <View style={{position:'absolute', left:0, top:0, padding:16}}>
            <Text style={{color:'#fff'}}>Фото {this.state.index} из {this.state.images.length-1}</Text>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  
});
