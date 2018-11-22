import * as React from 'react';
import CartList from '../components/Cart/CartList'

export default class Cart extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
         return  <CartList />
    }
}