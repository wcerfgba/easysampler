import { h, Component } from 'preact';
import style from './style';

import Trigger from '../trigger';

import * as R from 'ramda';

export default class TriggerGrid extends Component {

	buildInner(x, y) {
		return (
			<table>
				{this.buildRows(x, y)}
			</table>
		);
	}

	buildRows(x, y) {
		return R
			.range(0, y)
			.map(j => (<tr>{this.buildCells(j, x, y)}</tr>));
	}

	buildCells(j, x, y) {
		return R
			.range(0, x)
			.map(i => (<td>{this.buildButton(i + (j * y), i, j)}</td>));
	}

	buildButton(n, i, j) {
		const char = this.getChar(i, j);
		return (
			<Trigger
				label={char}
				keyboardKey={char}
				onClick={this.buildTriggerOnClickHandler(n)}
			/>
		);
	}

	getChar(i, j) {
		const keyboard = [
			[ '1', '2', '3', '4', '5', '6' ],
			[ 'q', 'w', 'e', 'r', 't', 'y' ],
			[ 'a', 's', 'd', 'f', 'g', 'h' ],
			[ 'z', 'x', 'c', 'v', 'b', 'n' ]
		];
		
		return keyboard[j][i];
	}

	buildTriggerOnClickHandler(n) {
		return ((trigger) => {
			this.props.sounds[n]();
			const activeTriggers = this.state.activeTriggers;
			activeTriggers[n] = trigger.state.active;
			this.setState({ activeTriggers });
		}).bind(this);
	}

	callActiveSounds = () => {
		this.state.activeTriggers.forEach((isActive, i) => {
			if (isActive) { this.props.sounds[i](); }
		});
	}

	constructor(props) {
		super(props);
		this.state = {
			activeTriggers: []
		};
	}

	render() {
		return (
			<div className={style.triggers}>
				{this.buildInner(this.props.x, this.props.y)}
			</div>
		);
	}
}