import { h, Component } from 'preact';
import style from './style';

import Quantizer from '../../components/quantizer';
import TriggerGrid from '../../components/trigger_grid';

export default class Home extends Component {

	onQuantizerChanged = (target) => {
		this.setSounds(target.state.sounds);
	}

	setSounds(sounds) {
		this.setState({ sounds }, this.triggerGrid.callActiveSounds);
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
			<div className={style.home}>
				<Quantizer
					onChange={this.state.onQuantizerChanged}
				/>
				<TriggerGrid
					ref={triggerGrid => this.triggerGrid = triggerGrid}
					x={6}
					y={4}
					sounds={this.state.sounds}
				/>
			</div>
		);
	}

}
