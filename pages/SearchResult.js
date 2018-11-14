import * as React from 'react';
import { Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {toggleSearchPanel, addSearchResult, setSearchText} from '../actions';

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
         return (
            <View>
                <View style={{paddingHorizontal:16, paddingVertical:32}}>
                    <Text style={{fontSize:18, color:'#999'}}>Поиск начинается здесь</Text>
                </View>
                { 
                    (this.props.searchResult)?this.props.searchResult.map((item,index) =>
                    <TouchableOpacity key={index}>
                        <View style={{flexDirection:'row', paddingVertical:10, paddingHorizontal:16, backgroundColor:'#fff', borderTopColor:'#fafafa', borderTopWidth:1,alignContent:'center', alignItems:'center'}}>
                            <Image source={{uri:'http://etsgroup.ru/img_serv/brands/'+item.brand+'.png'}} style={{width:30, height:30}}></Image>
                            <Text style={{color:'blue', fontSize:14, marginLeft:16, marginRight:16}}>{item.oem} {item.brand} {item.title}</Text>
                        </View>
                    </TouchableOpacity>
                    ):null
                }
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        searchResult: state.app.searchResult,
        text: state.app.text,
        searchText: state.app.searchText
    }
}
const mapDispatchToProps = (dispatch, payload) => {
    return{
        toggleSearchPanel: (payload) => dispatch(toggleSearchPanel(payload)),
        addSearchResult: (payload) => dispatch(addSearchResult(payload)),
        
        
    } 
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchResult)