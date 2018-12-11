import * as React from 'react';
import { Text, View,  Image, TouchableOpacity, ScrollView,BackHandler,ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import {toggleSearchPanel, addSearchResult,  navigate,  offersSetProductId, fetchOffers,setOffers} from '../actions';

class SearchResult extends React.Component {
    constructor(props) {
        super(props)
        //console.log(this.props)
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigate('Dashboard') ;
            this.props.offersSetProductId(null);
            this.props.setOffers(null);
            return true;
        });
    }
    
    componentWillUnmount() {
        this.backHandler.remove();
    }
    
    render() {
        if(this.props.loadingSearch){
            return (
                <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                    <ActivityIndicator size="large"></ActivityIndicator>
                </View>
            )
        }
        else if(this.props.loadingError){
            return(
                <View style={{flexDirection:'column', justifyContent:'flex-start', alignItems:'center', flex:1, paddingHorizontal:8, paddingVertical:8,backgroundColor:'#fff'}}>
                    <Text style={{color:'#37474F', fontSize:18, marginTop:42, marginBottom:4}}>Ошибка</Text>
                    <Text style={{color:'#607D8B'}}>Возможно, нет подключения к интернету</Text>
                </View>
            )
        }else if(this.props.searchResult.length==0&&this.props.loaded){
            return(
                <View style={{flexDirection:'column', justifyContent:'flex-start', alignItems:'center', flex:1, paddingHorizontal:8, paddingVertical:8,backgroundColor:'#fff'}}>
                    <Text style={{color:'#37474F', fontSize:18, marginTop:42, marginBottom:4}}>Нет результатов</Text>
                    <Text style={{color:'#607D8B'}}>Возможно, номер указан неправильно</Text>
                </View>
            )
        }
        else if(this.props.searchResult.length>0&&this.props.loaded){

            return (
                <View>
                    
                    <ScrollView>
                    { 
                        (this.props.searchResult)?this.props.searchResult.map((item,index) =>
                        <TouchableOpacity 
                            key={index} 
                            onPress={()=> {
                                //requestAnimationFrame(() => {
                                    this.props.fetchOffers(item.id)
                                    this.props.offersSetProductId(item.id);
                                    this.props.navigate('Offers', {headerText:item.brand+' '+item.oem,backButtonVisible:true})
                                    
                                //})
                            }}>
                            <View style={{flexDirection:'row', paddingVertical:10, paddingHorizontal:16, borderTopColor:'#fafafa', borderTopWidth:1,alignContent:'center', alignItems:'center',backgroundColor:'#fff'}}>
                                <Image source={{uri:'http://etsgroup.ru/img_serv/brands/'+item.brand+'.png'}} style={{width:30, height:30}}></Image>
                                <Text style={{color:'blue', fontSize:14, marginLeft:16, marginRight:16}}>{item.oem} {item.brand} <Text style={{color:'#999'}}>{item.title}</Text></Text>
                            </View>
                        </TouchableOpacity>
                        ):null
                    }
                    </ScrollView>
                </View>
            )
        }else{
            return(
                <View style={{flexDirection:'column', justifyContent:'flex-start', alignItems:'center', flex:1, paddingHorizontal:0, paddingVertical:8,backgroundColor:'#fff'}}>
                <Text style={{color:'#37474F', fontSize:18, marginTop:42, marginBottom:4}}>ETS GROUP в твоем смартфоне!</Text>
                <Text style={{color:'#607D8B'}}>Мы рады Вас видеть!</Text>

                <TouchableOpacity
                   onPress={()=>this.props.toggleSearchPanel(true)}
                >
                        <View style={{backgroundColor:'#3F51B5', paddingVertical:8, paddingHorizontal:16, borderRadius:3, elevation:1, marginTop:16}}>
                            <Text style={{color:'#fff', textAlign:'center'}}>Начать поиск</Text>
                        </View>
                </TouchableOpacity>

                <Image source={{uri:'http://etsgroup.ru/old1.jpg'}} style={{width:'100%', height:'50%', marginTop:32}}></Image>
            </View>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        searchResult: state.app.searchResult,
        text: state.app.text,
        searchText: state.app.searchText,
        loadingSearch:state.app.loadingSearch,
        loadingError:state.app.loadingError,
        loaded:state.app.loaded,
       
    }
}
const mapDispatchToProps = (dispatch, payload) => {
    return{
        toggleSearchPanel: (payload) => dispatch(toggleSearchPanel(payload)),
        addSearchResult: (payload) => dispatch(addSearchResult(payload)),
        navigate : (payload,params) => dispatch(navigate(payload,params)),
        offersSetProductId: (payload) => dispatch(offersSetProductId(payload)),
        fetchOffers : (payload) => dispatch(fetchOffers(payload)),
        setOffers : (payload) => dispatch(setOffers(payload))
    } 
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchResult)