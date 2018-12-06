import * as React from 'react';


import {createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk'
import reducers from './reducers';
import AppWrap	from './AppWrap';

let store = createStore(reducers,applyMiddleware(thunk));

class App extends React.Component {

	constructor(props) {
		super(props)
	}
	
	render() {
		return (
			<Provider store={store}>
				<AppWrap></AppWrap>
			</Provider>
		)
	}
}
export default App;