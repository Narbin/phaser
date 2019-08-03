module App {
	export class Gameplay extends Phaser.State {
		background: Phaser.Sprite;
		reelBg: Phaser.Sprite;
		logo: Phaser.Sprite;
		rollers: Array<Roller>;
		rollersWidth: number;
		rollersHeight: number;
		startActiveBtn: Phaser.Button;
		animationCompleted: boolean;
		create() {
			this.animationCompleted = true;
			this.background = this.game.add.sprite(0, 0, 'main', 'bg'); 
			this.background.width = this.game.width;
			this.background.height = this.game.height;
			this.rollersWidth = 350;
			this.rollersHeight = 174;

			this.reelBg = this.game.add.sprite(0, 0, 'main', 'reelBg'); 

			this._initRollers();

			this.logo = this.game.add.sprite(0, 0, 'main', 'logo'); 
			this.logo.y = -12;
			this.logo.x = this.game.width * 0.5 - this.logo.width * 0.5;

			this._initUI();
		}
		_initUI = function () {
			var button_start_background = this.game.add.sprite(0, 0, 'desktopUi', 'button_start_background'); 
			button_start_background.y = this.game.height - button_start_background.height + 21;
			button_start_background.x = this.game.width * 0.5 - button_start_background.width * 0.5;

			var maxbet_disable = this.game.add.sprite(0, 0, 'desktopUi', 'maxbet_disable'); 
			maxbet_disable.y = button_start_background.y + 30 * 0.5;
			maxbet_disable.x = button_start_background.x + 15;

			var auto_disable = this.game.add.sprite(0, 0,  'desktopUi', 'auto_disable'); 
			auto_disable.y = button_start_background.y + 33 * 0.5;
			auto_disable.x = button_start_background.x + button_start_background.width * 0.5;

			this.startActiveBtn = this.game.add.button(0, 0, 'desktopUi',  function () {
				if(this.animationCompleted) {
					this.animationCompleted = false;
					this.animRollers();
					this.tooglePlayBtn();
				}
			}, this, 'start_active', 'start_active', 'start_active'); 
			this.startActiveBtn.y = button_start_background.y + 26 * 0.5;
			this.startActiveBtn.x = button_start_background.x + button_start_background.width * 0.5 - this.startActiveBtn.width * 0.5;
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

				roller.group.align(1, -1, that.rollersWidth + 70, that.rollersHeight, Phaser.TOP_CENTER);
				roller.group.x = that.game.width * 0.5 + roller.group.width / 2 - ((that.rollersWidth + 15) * index) ; 
				roller.group.y = that.game.height / 2 - 300;

			    var mask = that.game.add.graphics(roller.group.x, roller.group.y);
			    mask.beginFill(0xffffff);
			    mask.drawRect(0, 9, that.rollersWidth , that.rollersHeight * 3);

			    roller.group.mask = mask;
			});
		}
		animRollers = function () {
			var random = ~~(Math.random() * 3 + 3);

			this.rollers.forEach(function(roller: Roller) {
				roller.startTween(random); ;
			});
		}
		tooglePlayBtn = function() {
			var that = this;
			this.startActiveBtn.setFrames('stop_active', 'stop_active', 'stop_active');
			window.setTimeout(function() {
				that.startActiveBtn.setFrames('start_active', 'start_active', 'start_active');
				that.animationCompleted = true;
			}, 1000 + 3 * 60);
		}
	}
} 