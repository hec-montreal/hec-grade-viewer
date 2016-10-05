import { AcademicSession } from "./academic-session";
import { Assignment } from "./assignment";

export class Course {
	id: string;
	title: string;
	description: string;
	session: AcademicSession;
	number: string;
	assignments: Assignment[];
}
