import { AcademicSession } from "./academic-session";
import { Assignment } from "./assignment";

export class Course {
	id: string;
	title: string;
	description: string;
	session: AcademicSession;
	number: string;
	assignments: Assignment[];

	constructor(json: JSON) {
		this.id = json["id"];
		this.title = json["title"];
		this.description = json["description"];
		this.session = new AcademicSession(json["session"]);
		this.number = json["number"];
		this.assignments = [];

		for (var i = 0; i < json["assignments"].length; i++) {
			this.assignments.push(new Assignment(json["assignments"][i]));
		}
	}
}
