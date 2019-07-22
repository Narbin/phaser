module App {
	export class Preloader extends Phaser.State {
		background: Phaser.Sprite;

		preload() {
           
		}

		create() {
			this.game.state.start('Gameplay');
		}
	}
}