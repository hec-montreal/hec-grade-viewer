import { AcademicSession } from "./academic-session";
import { Assignment } from "./assignment";
import { Grade } from "./grade";

export class Course {
	id: string;
	title: string;
	description: string;
	session: AcademicSession;
	number: string;
	assignments: Assignment[];
	courseGrade: Grade;

	constructor(json: JSON) {
		this.id = json["id"];
		this.title = json["title"];
		this.description = json["description"];
		this.session = new AcademicSession(json["session"]);
		this.number = json["number"];
		this.courseGrade = new Grade(json["courseGrade"]);
		this.assignments = [];

		for (var i = 0; i < json["assignments"].length; i++) {
			this.assignments.push(new Assignment(json["assignments"][i]));
		}
	}
}
