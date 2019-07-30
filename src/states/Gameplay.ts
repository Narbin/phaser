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
			var duration = 800;
			this.rollers = [];

			this.game.cache.getJSON('config').forEach(function (item: Array<String>) {
				that.rollers.push(new Roller(item, that));
			});
			
			this.rollers.forEach(function(roller: Roller, index: number) {
				roller.duration = duration;
				duration += 60;
				roller.group.onChildInputDown.add(function (child: Phaser.Sprite, pointer: any) {
					that.animRollers();
				}, that);

				roller.group.align(1, -1, 250, 200, Phaser.TOP_CENTER);
				roller.group.x = that.game.width * 0.5 + roller.group.width / 2 - (300 * index); 
				roller.group.y = that.game.height / 2 - 300;

			    var mask = that.game.add.graphics(roller.group.x, roller.group.y);
			    mask.beginFill(0xffffff);
			    mask.drawRect(0, 0, 300, 200 * 3);

			    roller.group.mask = mask;
			});
			console.log(this.rollers)
		}
		animRollers = function () {
			var that = this;
			var random = ~~(Math.random() * 3 + 3);
			
			this.rollers.forEach(function(roller: Roller) {
				roller.startTween(random); ;
			});
		}
	}
} 