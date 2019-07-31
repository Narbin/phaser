module App {
	export class Gameplay extends Phaser.State {
		background: Phaser.Sprite;
		rollers: Array<Roller>;
		rollersWidth: number;
		rollersHeight: number;
		create() {
			this.background = this.game.add.sprite(0, 0, 'main', 'bg'); 
			this.background.width = this.game.width;
			this.background.height = this.game.height;
			this.rollersWidth = 350;
			this.rollersHeight = 174;

			var reelBg = this.game.add.sprite(0, 0, 'main', 'reelBg'); 
		
			this._initRollers();
		}
		_initUI = function () {

		}
		_initRollers = function () {
			var that = this;
			var duration = 800;
			this.rollers = [];

			this.game.cache.getJSON('config').forEach(function (item: Array<String>) {
				that.rollers.push(new Roller(item, that, that.rollersWidth, that.rollersHeight));
			});
			
			this.rollers.forEach(function(roller: Roller, index: number) {
				roller.duration = duration;
				duration += 60;
				roller.group.onChildInputDown.add(function (child: Phaser.Sprite, pointer: any) {
					that.animRollers();
				}, that);

				roller.group.align(1, -1, that.rollersWidth + 70, that.rollersHeight, Phaser.TOP_CENTER);
				roller.group.x = that.game.width * 0.5 + roller.group.width / 2 - ((that.rollersWidth + 15) * index) ; 
				roller.group.y = that.game.height / 2 - 300;

			    var mask = that.game.add.graphics(roller.group.x, roller.group.y);
			    mask.beginFill(0xffffff);
			    mask.drawRect(0, 9, that.rollersWidth , that.rollersHeight * 3);

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