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

	onOffsetInputChanged = (e) => {
		this.setOffsetAndUpdateHowler(Number.parseInt(e.target.value, 10));
	}

	setOffsetAndUpdateHowler(offset) {
		this.setState({ offset }, this.updateHowler);
	}

	onTotalInputChanged = (e) => {
		this.setTotalAndUpdateHowler(Number.parseInt(e.target.value, 10));
	}

	setTotalAndUpdateHowler(total) {
		this.setState({ total }, this.updateHowler);
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
			this.state.objectUrl == null ||
			this.state.period 	 == null ||
			this.state.offset    == null ||
			this.state.total     == null
		) { return; }

		const spriteMap = this.buildSpriteMap();
		const newHowl = new Howl({
			src: [ this.state.objectUrl ],
			loop: true,
			sprite: spriteMap,
			format: 'mp3'
		});
		const sounds = this.buildSounds(spriteMap);
		const oldHowl = this.state.howl;
		if (oldHowl) {
			oldHowl.stop();
		}
		this.setState({ howl: newHowl, sounds }, this.onChange);
	}

	buildSpriteMap({
		total  = this.state.total,
		period = this.state.period,
		offset = this.state.offset
	} = {}) {
		return R
			.range(0, total)
			.reduce((map, next) => (
				{
					...map,
					[next.toString()]: [	(period * next) + offset, period ]
				}
			), {});
	}

	buildSounds(spriteMap) {
		return R
			.map((key) => this.buildSound(key), Object.keys(spriteMap));
	}

	buildSound(key) {
		let id = null;
		return () => {
			const howl = this.state.howl;
			if (id !== null && howl.playing(id)) {
				howl.stop(id);
			}
			else {
				id = howl.play(key);
			}
		};
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
			period: 100,
			offset: 100000,
			total: 100
		};
		this.onChange = this.onChange.bind(this);
	}

	render() {
		return (
			<div className={style.quantizer}>
				<label>
					Period
					<input
						type="number"
						step={1}
						value={this.state.period}
						onChange={this.onPeriodInputChanged}
					/>
				</label>
				<label>
					Offset
					<input
						type="number"
						step={1}
						value={this.state.offset}
						onChange={this.onOffsetInputChanged}
					/>
				</label>
				<label>
					Total
					<input
						type="number"
						step={1}
						value={this.state.total}
						onChange={this.onTotalInputChanged}
					/>
				</label>
				<label>
					File
					<input
						type="file"
						onChange={this.onFileInputChanged}
					/>
				</label>
			</div>
		);
	}
}