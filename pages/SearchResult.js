import * as React from 'react';
import { Text, View,  Image, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import {toggleSearchPanel, addSearchResult,  navigate,  offersSetProductId} from '../actions';

class SearchResult extends React.Component {
    constructor(props) {
        super(props)
        //console.log(this.props)
    }

    componentWillMount = ()=>{
        
    }
    
    componentDidMount(){
    }
    
    render() {
        if(this.props.loadingSearch){
            return (
                <View style={{paddingHorizontal:16, paddingVertical:24}}>
                        <Text style={{fontSize:16, color:'#999'}}>Ищу...</Text>
                </View>
            )
        }
        else if(this.props.loadingError){
            return(
                <View style={{paddingHorizontal:16, paddingVertical:24}}>
                        <Text style={{fontSize:16, color:'#999'}}>Не могу подключиться, походу интрента нет</Text>
                </View>
            )
        }else if(this.props.searchResult.length==0&&this.props.loaded){
            return(
                <View style={{paddingHorizontal:16, paddingVertical:24}}>
                        <Text style={{fontSize:16, color:'#999'}}>Я не смог найти номер. Или его у меня нет, или введен некорректно</Text>
                </View>
            )
        }
        else if(this.props.searchResult.length>0&&this.props.loaded){

            return (
                <View>
                    <View style={{paddingHorizontal:16, paddingVertical:24}}>
                        <Text style={{fontSize:16, color:'#999'}}>Вот, что я нашел:</Text>
                    </View>
                    <ScrollView>
                    { 
                        (this.props.searchResult)?this.props.searchResult.map((item,index) =>
                        <TouchableOpacity 
                            key={index} 
                            onPress={()=> {
                                requestAnimationFrame(() => {
                                    this.props.offersSetProductId(item.id);
                                    this.props.navigate('Offers', {headerText:item.brand+' '+item.oem,backButtonVisible:true})
                                    
                                })
                            }}>
                            <View style={{flexDirection:'row', paddingVertical:10, paddingHorizontal:16, backgroundColor:'#fff', borderTopColor:'#fafafa', borderTopWidth:1,alignContent:'center', alignItems:'center'}}>
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
                <View style={{padding:32}}>
                    <Text style={{fontSize:23,marginTop:24, marginBottom:3}}>Быстрый поиск!</Text>
                    <Text>Введи намер запчасти oem или аналоги и получи предложения с нашего склада прямо в своем смартфоне!</Text>

                    <Text style={{fontSize:23,marginTop:24, marginBottom:3}}>Удобная корзина!</Text>
                    <Text>Покупать легче обычного - просто ищите номера, нажмайте на корзину и оформляй заказ</Text>

                    <Text style={{fontSize:23,marginTop:24, marginBottom:3}}>Мы с Вами!</Text>
                    <Text>Мы всегда на связи и готовы стараться ради Вас!</Text>

                    <Text style={{fontSize:23,marginTop:24, marginBottom:3}}>Начните сейчас!</Text>
                    <Text>Нажмите на кнопку поиска и введите искомый номер. У нас есть, что Вам предложить</Text>

                    
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
        
    } 
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchResult)