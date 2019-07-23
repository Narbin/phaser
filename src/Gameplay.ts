module App {
	export class Gameplay extends Phaser.State {
		background: Phaser.Sprite;
		create() {
			this.background = this.game.add.sprite(0, 0, 'bg'); 
			this.background.width = this.game.width;
			this.background.height = this.game.height;
		}
	}
} 