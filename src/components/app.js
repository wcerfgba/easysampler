import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { createBrowserHistory } from 'history';

import Header from './header';
import Home from '../routes/home';

export default class App extends Component {
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	constructor(props) {
		super(props);
		this.history = createBrowserHistory({
			basename: '###BASENAME###'
		});
	}

	render() {
		return (
			<div id="app">
				<Router
					onChange={this.handleRoute}
					history={this.history}
				>
					<Home path="/" />
				</Router>
			</div>
		);
	}
}
