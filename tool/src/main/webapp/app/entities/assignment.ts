import { Grade } from "./grade";

export class Assignment {
	id: string;
	name: string;
	date: number;
	formattedDate: string;
	categoryId: string;
	categoryName: string;
	points: number;
	grade: Grade;

	constructor(json: JSON) {
		this.id = json["id"];
		this.name = json["name"];
		this.date = json["date"];
		this.formattedDate = json["formattedDate"];
		this.categoryId = json["categoryId"];
		this.categoryName = json["categoryName"];
		this.points = json["points"];
		this.grade = new Grade(json["grade"]);
	}
}
