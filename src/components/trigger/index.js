import { h, Component } from 'preact';
import style from './style';

import Mousetrap from 'mousetrap';

export default class Trigger extends Component {

	get label() {
		return this.props.label;
	}

	get extraClassNames() {
		return this.state.active ? ` ${style.active}` : '';
	}

	onClick = () => {
		this.setState({ active: !this.state.active }, () => this.props.onClick(this));
	}

	constructor(props) {
		super(props);
		this.state = {
			active: false
		};
		if (typeof window !== 'undefined') {
			if (this.props.keyboardKey) {
				Mousetrap.bind(this.props.keyboardKey, this.onClick);
			}
		}
	}

	render() {
		return (
			<button
				onClick={this.onClick}
				className={style.trigger + this.extraClassNames}
			>
				{this.label}
			</button>
		);
	}

}