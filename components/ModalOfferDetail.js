import * as React from 'react';
import {
	Text,
    View,Modal,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { toggleModalVisible} from '../actions';


class ModalOfferDetail extends React.Component {
	constructor(props) {
        super(props)
        console.log(this.props)
    }
    render(){
        return (
            <Modal
                onRequestClose={()=>{
                    this.props.toggleModalVisible(false)
                }}
                transparent={true}
                visible={this.props.modalVisible}
                animationType ="fade"
            >
                <View style={{backgroundColor:'#00000052', paddingHorizontal:24, paddingVertical:60, flex:1, flexDirection:'row', alignItems:'flex-start'}}>
                    <View style={{backgroundColor:"#fff", width:'100%', elevation:5, borderRadius:5, padding:24}}>
                        <Text style={{fontSize:18}}>ZF 1315202037</Text>
                        <Text>В наличии</Text>
                        <Text>13 500</Text>
                        <Text>10 шт</Text>
                        <Text>Вероятность поставки: Высокая</Text>
                        <Text>Описание: Вал первичный, лалалалал алал л37зубов и тд</Text>

                    </View>
                </View>

            </Modal>
        )
    }
}



const styles = StyleSheet.create({


});

const mapStateToProps = state => {
    return {
        modalVisible: state.app.modalVisible
    }
}
const mapDispatchToProps = (dispatch, payload) => {
    return{
        toggleModalVisible: (payload) => dispatch(toggleModalVisible(payload)),
    } 
}
export default connect(mapStateToProps, mapDispatchToProps)(ModalOfferDetail)