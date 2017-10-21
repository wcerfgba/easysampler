import { h, Component } from 'preact';
import style from './style';

import * as R from 'ramda';

export default class Triggers extends Component {

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
			.map(i => (<td>{this.buildButton((j * y) + i)}</td>));
	}

	buildButton(n) {
		return (
			<button
				onClick={this.props.sounds[n]}
			>
				{n}
			</button>
		);
	}

	render() {
		return (
			<div class={style.triggers}>
				{this.buildInner(10, 10)}
			</div>
		);
	}
}