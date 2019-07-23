module App {
	export class Game extends Phaser.Game {
		constructor() {

			super(1280, 720, Phaser.CANVAS, 'content', null);

			this.state.add('Boot', Boot, false);
			this.state.add('Preloader', Preloader, false);
			this.state.add('Gameplay', Gameplay, false);

			this.state.start('Boot');
		}
	}
}