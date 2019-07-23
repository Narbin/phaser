module App {
	export class Boot extends Phaser.State {
		init() {

			this.scale.setMinMax(0, 0, 1280, 720);
			this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			this.game.scale.pageAlignHorizontally = true;
			this.game.scale.pageAlignVertically = true;
			this.game.scale.refresh();
		}

		preload() {
		}

		create() {
			this.game.state.start('Preloader');
		}
	}
}
