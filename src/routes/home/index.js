import { h, Component } from 'preact';
import style from './style';

import Quantizer from '../../components/quantizer';
import Triggers from '../../components/triggers';

export default class Home extends Component {

	onQuantizerChanged = (target) => {
		this.setSounds(target.state.sounds);
	}

	setSounds(sounds) {
		this.setState({ sounds }, this.demo);
	}

	demo() {
		this.state.sounds.forEach((sound, i) => {
			setTimeout(sound, i * 10);
		});
	}

	constructor(props) {
		super(props);
		this.state = {
			sounds: [],
			onQuantizerChanged: this.onQuantizerChanged.bind(this)
		};
	}

	render() {
		return (
			<div class={style.home}>
				<Quantizer
					onChange={this.state.onQuantizerChanged}
				/>
				<Triggers
					sounds={this.state.sounds}
				/>
			</div>
		);
	}

}
