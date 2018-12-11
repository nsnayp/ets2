import * as React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  AsyncStorage,
  KeyboardAvoidingView
} from "react-native";
import {connect} from 'react-redux';
import {auth} from '../actions/AppWrapActions';


class AppNoAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      email: null,
      password: null
    };
    this.login = this.props.login;

  }
  componentDidMount() {}
  btnPressed = () => {
        this.props.auth(this.state.email, this.state.password)
  };
  render() {
    return (
        <View style={{flex:1}}>
            <Image source={{uri:'https://w-dog.ru/wallpapers/12/5/457445428658312/makro-trava-utro-rosa-kapli-fon-teplo.jpg'}} style={{width:'100%', height:'100%'}}></Image>



       
       <KeyboardAvoidingView behavior="padding" enabled style={{flex:1, width:'100%', height:'100%',position:'absolute', zIndex:10, }}>
      <View style={{width:'100%',padding:32, flexDirection:'row', justifyContent:'center', alignItems:'center',height:'100%'}}>

        

      <View style={{width:'100%', backgroundColor:'#fff',padding:32, borderRadius:4, elevation:10 }}>
        <View
          style={{ width: "100%", justifyContent: "center" }}
        >
          <Image
            source={{ uri: "http://etsgroup.ru/assets/img/ETSl.png" }}
            style={{
              width: 80,
              height: 80,
              alignSelf: "center"
            }}
          />
        </View>
        <View style={{ width: "100%"}}>
          <TextInput
            onChangeText={text => this.setState({ email: text })}
            placeholder='Email'
            style={{ paddingVertical: 8, paddingHorizontal: 16, fontSize: 17, borderColor:'#eee', borderWidth:1, borderRadius:3, marginBottom:8 }}
          />
          <TextInput
            onChangeText={text => this.setState({ password: text })}
            placeholder='Пароль'
            style={{ paddingVertical: 8, paddingHorizontal: 16, fontSize: 17, borderColor:'#eee', borderWidth:1, borderRadius:3, marginBottom:8 }}
          />
        </View>
        <View
          style={{
            justifyContent: "center",
            marginTop: 10,
            paddingHorizontal: 45,
            width: "100%"
          }}
        >

          <Text style={{color:'red', paddingBottom:8, textAlign:'center'}}>{this.props.error}</Text>

            <TouchableOpacity
                onPress={this.btnPressed}
            >
                    <View style={{backgroundColor:'#3F51B5', paddingVertical:16, paddingHorizontal:32, borderRadius:3, elevation:1}}>
                        <Text style={{color:'#fff', textAlign:'center'}}>Войти</Text>
                    </View>
            </TouchableOpacity>


        </View>
      </View>
      
       </View></KeyboardAvoidingView></View>
    );
  }
}



const mapStateToProps = state => {
    return {
        customer_id : state.appwrap.customer_id,
        error: state.appwrap.error
    }
}
const mapDispatchToProps = (dispatch, payload) => {
    return{
        auth: (login,password) => dispatch(auth(login,password)),
    } 
}
export default connect(mapStateToProps, mapDispatchToProps)(AppNoAuth)