export class AcademicSession {
	private static SEASONS: string[] = ["H", "E", "A"];

	code: string;
	name: string;

	constructor(json: JSON) {
		this.code = json["code"];
		this.name = json["name"];
	}

	compareTo(other: AcademicSession): number {
		let indexInSeasons = (c: string): number => {
			for (var i = 0; i < AcademicSession.SEASONS.length; i++) {
				if (AcademicSession.SEASONS[i] === c) {
					return i;
				}
			}

			return -1;
		};

		if (this.code.length === 0) {
			return 1;
		}

		if (other.code.length === 0) {
			return -1;
		}

		let thisIndex: number = indexInSeasons(this.code.charAt(0));
		let otherIndex: number = indexInSeasons(other.code.charAt(0));

		if (thisIndex !== otherIndex) {
			return thisIndex - otherIndex;
		}

		let thisYear = parseInt(this.code.substring(1), 10);
		let otherYear = parseInt(this.code.substring(1), 10);

		return thisYear - otherYear;
	}
}
