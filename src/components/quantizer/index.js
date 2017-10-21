import { h, Component } from 'preact';
import style from './style';

import { Howl } from 'howler';
import * as R from 'ramda';

export default class Quantizer extends Component {

	onPeriodInputChanged = (e) => {
		this.setPeriodAndUpdateHowler(Number.parseInt(e.target.value, 10));
	}

	setPeriodAndUpdateHowler(period) {
		this.setState({ period }, this.updateHowler);
	}

	onFileInputChanged = (e) => {
		const file = e.target.files[0];
		this.updateObjectUrlAndUpdateHowler(file);
	}

	updateObjectUrlAndUpdateHowler(newFile) {
		const oldObjectUrl = this.state.objectUrl;
		const newObjectUrl = URL.createObjectURL(newFile);
		this.setState({ objectUrl: newObjectUrl }, this.updateHowler);
		URL.revokeObjectURL(oldObjectUrl);
	}

	updateHowler = () => {
		if (
			!this.state.objectUrl ||
			!this.state.period
		) { return; }

		const spriteMap = this.buildSpriteMap();
		const howl = new Howl({
			src: [ this.state.objectUrl ],
			loop: true,
			sprite: spriteMap,
			format: 'mp3'
		});
		const sounds = this.buildSounds(spriteMap);
		this.setState({ howl, sounds }, this.onChange);
	}

	buildSpriteMap({
		count = 6,
		interval = 100
	} = {}) {
		return R
			.range(0, count)
			.reduce((map, next) => (
				{
					...map,
					[next]: [ interval * next, interval * (next + 1) ]
				}
			), {});
	}

	buildSounds(spriteMap) {
		return R
			.map((key) => () => this.state.howl.play(key), Object.keys(spriteMap));
	}

	get sounds() {
		return this.state.sounds;
	}

	onChange() {
		this.props.onChange(this);
	}

	constructor(props) {
		super(props);
		this.state = {
			period: 1
		};
		this.onChange = this.onChange.bind(this);
	}

	render() {
		return (
			<div class={style.quantizer}>
				<input
					type="number"
					min={0}
					max={1000}
					value={this.state.period}
					onChange={this.onPeriodInputChanged}
				/>
				<input
					type="file"
					onChange={this.onFileInputChanged}
				/>
			</div>
		);
	}
}