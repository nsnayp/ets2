import * as React from 'react';
import {
	Text,
    View,Modal,
    StyleSheet,TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { toggleModalVisible} from '../actions';
import { Feather,MaterialIcons,FontAwesome } from '@expo/vector-icons';

class ModalOfferDetail extends React.Component {
	constructor(props) {
        super(props)

    }
    render(){
        
        if(this.props.modalData){
        const data = this.props.modalData
        console.log(data)
        return (
            <Modal
                onRequestClose={()=>{
                    this.props.toggleModalVisible({modalVisible:false,modalData:null})
                }}
                transparent={true}
                visible={this.props.modalVisible}
                animationType ="fade"
            >
                <View style={{backgroundColor:'#00000085', paddingHorizontal:24, paddingVertical:60, flex:1, flexDirection:'row', alignItems:'flex-start'}}>
                    <View style={{backgroundColor:"#fff", width:'100%', elevation:5, borderRadius:5, padding:24, position:'relative'}}>

                        <View style={{position:'absolute', right:0, top:0}}>
                        <TouchableOpacity onPress={() => {this.props.toggleModalVisible({modalVisible:false,modalData:null})}}>
                            <View style={[ {width: 56, height: 56, justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }]}>
                                <Feather name="x" size={20} color="#999" style={{}} />
                            </View>
                        </TouchableOpacity>
                        </View>



                        <View style={{marginBottom:24}}>
                            <Text style={{fontSize:18}}>{data.brand} {data.oem}</Text>
                            <Text style={{fontSize:14, color:'#999'}}>{data.name}</Text>
                        </View>

                        <View style={[styles.tr, {borderTopWidth:0}]}>
                            <View style={[styles.td1]}><Text style={{color:'#999'}}>Вероятность поставки</Text></View>
                            <View style={styles.td2}><Text>{data.delivery_prob}</Text></View>
                        </View>
                        <View style={styles.tr}>
                            <View style={styles.td1}><Text style={{color:'#999'}}>Срок поставки</Text></View>
                            <View style={styles.td2}><Text>{data.srok} день</Text></View>
                        </View>
                        <View style={styles.tr}>
                            <View style={styles.td1}><Text style={{color:'#999'}}>Количество</Text></View>
                            <View style={styles.td2}><Text>13 шт</Text></View>
                        </View>
                        <View style={styles.tr}>
                            <View style={styles.td1}><Text style={{color:'#999'}}>Цена</Text></View>
                            <View style={styles.td2}><Text>{data.price} Р</Text></View>
                        </View>



                    </View>
                </View>

            </Modal>
        )}else{return null}
    }
}



const styles = StyleSheet.create({
    tr:{
        flexDirection:'row',
        borderTopWidth:1,
        borderTopColor:'#eee'
    },
    td1:{
        width:'60%',
        paddingVertical:8,
        paddingRight:8
    },
    td2:{
        width:'40%',
        paddingVertical:8,
        paddingLeft:8
    }

});

const mapStateToProps = state => {
    return {
        modalVisible: state.app.modalVisible,
        modalData: state.app.modalData
    }
}
const mapDispatchToProps = (dispatch, payload) => {
    return{
        toggleModalVisible: (payload) => dispatch(toggleModalVisible(payload)),
    } 
}
export default connect(mapStateToProps, mapDispatchToProps)(ModalOfferDetail)