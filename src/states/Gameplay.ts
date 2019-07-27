module App {
	export class Gameplay extends Phaser.State {
		background: Phaser.Sprite;
		rollers: Array<Roller>;
		create() {
			this.background = this.game.add.sprite(0, 0, 'main', 'bg'); 
			this.background.width = this.game.width;
			this.background.height = this.game.height;
		
			this._initRollers();
		}
		_initUI = function () {

		}
		_initRollers = function () {
			var that = this;
			this.rollers = [];

			this.game.cache.getJSON('config').forEach(function (item: Array<String>) {
				that.rollers.push(new Roller(item));
			});
			
			this.rollers.forEach(function(roller: Roller, index: number) {
				roller.group = that.add.group();

				roller.symbols.forEach(function(symbol: String) {
					var _sprite = that.add.sprite(0, 0, 'symbols', symbol + "_000"); 
					roller.group.add(_sprite);
				});

				roller.group.align(1, -1, 250, 200);
				roller.group.x = that.game.width * 0.5 + roller.group.width / 2 - (300 * index); 
				roller.group.y = that.game.height / 2 - 300;

			    var mask = that.game.add.graphics(roller.group.x, roller.group.y);
			    mask.beginFill(0xffffff);
			    mask.drawRect(0, 0, 300, 200 * 3);

			    roller.group.mask = mask;
			});
			console.log(this.rollers)
		}
	}
} 