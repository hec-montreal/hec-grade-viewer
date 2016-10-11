export class Grade {
	value: number;
	comment: string;
	published: boolean;

	constructor(json: JSON) {
		this.value = json["value"];
		this.comment = json["comment"];
		this.published = json["published"];
	}
}
