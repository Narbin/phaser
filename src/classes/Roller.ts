interface iRoller {
    symbols: Array<String>;
    group: Phaser.Group
}

module App {
	export class Roller implements iRoller {
		symbols: Array<String>
		group: Phaser.Group
		constructor(symbols: Array<String>) {
			this.symbols = symbols;
		}
	}
}
