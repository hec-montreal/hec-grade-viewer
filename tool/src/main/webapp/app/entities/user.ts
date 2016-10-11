export class User {
	id: string;
	matricule: string;
	fullName: string;

	constructor(json: JSON) {
		this.id = json["id"];
		this.matricule = json["matricule"];
		this.fullName = json["fullName"];
	}
}
