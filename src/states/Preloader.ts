module App {
	export class Preloader extends Phaser.State {
		preload() {
			var that = this;
			this.game.load.atlasJSONHash('desktopUi', 'assets/i/desktopUi.png', 'assets/json/desktopUi.json');
			this.game.load.atlasJSONHash('main', 'assets/i/main.png', 'assets/json/main.json');
			this.game.load.atlasJSONHash('symbols', 'assets/i/symbols1.png', 'assets/json/symbols1.json');
			this.game.load.atlasJSONHash('symbols', 'assets/i/symbols2.png', 'assets/json/symbols2.json');
			this.game.load.atlasJSONHash('symbols', 'assets/i/symbols3.png', 'assets/json/symbols3.json');
			this.game.load.atlasJSONHash('symbols', 'assets/i/symbols4.png', 'assets/json/symbols4.json');
			this.game.load.atlasJSONHash('symbols', 'assets/i/symbols5.png', 'assets/json/symbols5.json');
			this.game.load.json('config', 'config/appConfig.json');
		}

		create() {
			this.game.state.start('Gameplay');

		}
	}
}