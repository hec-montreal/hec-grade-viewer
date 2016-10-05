import { User } from "./user";
import { Course } from "./course";
import { AcademicSession } from "./academic-session"

export class UserCourses {
	user: User;
	courses: Course[];

	constructor(json: any) {
		this.user = json.user;
		this.courses = json.courses;
	}

	getSessions(): AcademicSession[] {
		let ret: AcademicSession[] = [];

		for (let course of this.courses) {
			let isIn = false;

			for (let session of ret) {
				if (session.code === course.session.code) {
					isIn = true;
					break;
				}
			}

			if (!isIn && course.session && course.session.code && course.session.code.length > 0) {
				ret.push(course.session);
			}
		}

		return ret;
	}
}
