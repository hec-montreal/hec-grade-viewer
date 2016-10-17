export class Grade {
	value: number;
	formattedValue: string;
	letter: string;
	isNull: boolean;
	comment: string;
	published: boolean;

	constructor(json: JSON) {
		this.value = json["value"];
		this.formattedValue = json["formattedValue"];
		this.letter = json["letter"];
		this.isNull = json["null"];
		this.comment = json["comment"];
		this.published = json["published"];
	}

	getFinalValue(): string {
		let ret: string = "";

		if(!!this.letter) {
			ret += "(" + this.letter + ") ";
		}

		return ret + this.formattedValue;
	}

	compareTo(other: Grade): number {
		if (this.isNull) {
			return 1;
		}

		if (other.isNull) {
			return -1;
		}

		if (this.value != null && other.value != null) {
			return this.value - other.value;
		}

		return 0;
	}
}
