module App {
	export class Gameplay extends Phaser.State {
		background: Phaser.Sprite;
		rollers: Array<Roller>;
		create() {
			var that = this;
			this.rollers = [];

			this.background = this.game.add.sprite(0, 0, 'main', 'bg'); 
			this.background.width = this.game.width;
			this.background.height = this.game.height;
		
			this.game.cache.getJSON('config').forEach(function (item: Array<String>) {
				that.rollers.push(new Roller(item));
			});
		}
	}
} 