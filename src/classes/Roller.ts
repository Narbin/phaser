interface iRoller {
    symbols: Array<String>;
    group: Phaser.Group;
    tween: Phaser.Tween;
    sprites: Array<Phaser.Sprite>;
    duration: number;
    game: Phaser.State;
}

module App {
	export class Roller implements iRoller {
		symbols: Array<String>
		group: Phaser.Group
		tween: Phaser.Tween
		sprites: Array<Phaser.Sprite>
		duration: number
		game: Phaser.State
		constructor(symbols: Array<String>, game: Phaser.State) {
			var that = this;
			this.symbols = symbols;
			this.sprites = [];
			this.tween;
			this.group = game.add.group();
			this.duration = 0;
			this.game = game;
			
			this.symbols.forEach(function(symbol: String) {
				var _sprite = that.findAndCreateSprite('symbols', symbol + "_000");
				that.sprites.push(_sprite);
	    		_sprite.inputEnabled = true;
	    		_sprite.scale.set(250 / _sprite.width);
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
					y: that.group.y - 200 * howMany
				}, this.duration, Phaser.Easing.Back.Out, false);

				this.tween.onUpdateCallback(function (tween: Phaser.Tween, value: number, tweenData: Phaser.TweenData){
					if (tweenData.percent > 0.3 && !flag) {
						flag = true;
						for (var i = howMany; i > 0; i--) {
							last = that.group.getBottom();
							first = that.group.getTop();
							that.group.bringToTop(last);
							last.position.y = first.position.y + 200;
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
