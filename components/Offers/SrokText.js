import * as React from 'react';
import {
	Text,
	View,StyleSheet
} from 'react-native';

export default class SrokText extends React.PureComponent {
	constructor(props) {
		super(props)
    }
    render(){
        const srok = this.props.srok;
        if(srok==0){
            return(
                <View style={styles.squireWrap}>
                    <View style={styles.squireNal}></View>
                    <Text style={{marginLeft:10, fontSize:14, color:'green'}}>Склад</Text>
                </View>
                
            )
        }else{
            return(
                <View style={styles.squireWrap}>
                    <View style={styles.squireDay}></View>
                    <Text style={{marginLeft:10, fontSize:14, color:'#424242'}}>{srok} дн</Text>
                </View>
            )
        }
    }
}



const styles = StyleSheet.create({

	squireNal:{backgroundColor:'#4CAF50', width:16,borderRadius:2, height:16,borderColor:'#4CAF50'},
	squireDay:{backgroundColor:'#fff', width:16, height:16, borderRadius:2, borderWidth:2,borderColor:'#4CAF50'},
	squireWrap:{flexDirection:'row',alignItems:'center'},
	
	
  });