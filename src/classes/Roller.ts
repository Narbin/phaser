interface iRoller {
    symbols: Array<String>;
}

module App {
	export class Roller implements iRoller {
		symbols: Array<String>
		constructor(symbols: Array<String>) {
			this.symbols = symbols;
		}
	}
}
