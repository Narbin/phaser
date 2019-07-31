interface iRoller {
    symbols: Array<String>;
    group: Phaser.Group;
    tween: Phaser.Tween;
    sprites: Array<Phaser.Sprite>;
    duration: number;
    game: Phaser.State;
    rollerWidth: number;
    rollerHeight: number;
}

module App {
	export class Roller implements iRoller {
		symbols: Array<String>
		group: Phaser.Group
		tween: Phaser.Tween
		sprites: Array<Phaser.Sprite>
		duration: number
		game: Phaser.State
		rollerWidth: number
		rollerHeight: number
		constructor(symbols: Array<String>, game: Phaser.State, rollersWidth: number, rollersHeight: number) {
			var that = this;
			this.symbols = symbols;
			this.sprites = [];
			this.tween;
			this.group = game.add.group();
			this.duration = 0;
			this.game = game;
			this.rollerWidth = rollersWidth;
			this.rollerHeight = rollersHeight;
			
			this.symbols.forEach(function(symbol: String) {
				var _sprite = that.findAndCreateSprite('symbols', symbol + "_000");
	    		_sprite.inputEnabled = true;
	    		_sprite.scale.set((that.rollerWidth - 50) / _sprite.width);
	    		that.sprites.push(_sprite);
	    		that.group.add(_sprite);
	    	});
		}
		findAndCreateSprite(key: string, keyframe: string) : Phaser.Sprite {
			var that = this;
			var keys = this.game.cache.getKeys(Phaser.Cache.IMAGE);
			var frame = null;
			var sprite:Phaser.Sprite = null;

			keys.forEach(function (key: string) {
				if (sprite === null && (/(symbols)/).test(key)) {
					frame = that.game.cache.getFrameByName(key, keyframe);
					if (frame !== null) {
						sprite = that.game.add.sprite(0, 0, key, keyframe);
					}
				}
			});
			if (sprite === null) {
				sprite = that.game.add.sprite(0, 0, key, keyframe);
			}
			return sprite;
		}
		startTween(howMany: number) {
			var that = this;
			var flag = false;
			var last;
			var first;

			if (!this.tween || this.tween && !this.tween.isRunning) {

				this.tween = this.game.add.tween(this.group).to({
					y: that.group.y - that.rollerHeight * howMany
				}, this.duration, Phaser.Easing.Back.Out, false);

				this.tween.onUpdateCallback(function (tween: Phaser.Tween, value: number, tweenData: Phaser.TweenData){
					if (tweenData.percent > 0.33 && !flag) {
						flag = true;
						for (var i = howMany; i > 0; i--) {
							last = that.group.getBottom();
							first = that.group.getTop();
							that.group.bringToTop(last);
							last.position.y = first.position.y + that.rollerHeight;
						}
					}
				});

				this.tween.onComplete.add(function (tween: Phaser.Tween) {
					flag = false;
				});

				this.tween.start();
			}
		}
	}
}
