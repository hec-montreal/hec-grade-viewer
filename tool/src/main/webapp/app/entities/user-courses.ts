import { User } from "./user";
import { Course } from "./course";
import { AcademicSession } from "./academic-session"

export class UserCourses {
	static OK: number = 0;

	errorCode: number;
	user: User;
	courses: Course[];

	constructor(json: JSON) {
		this.errorCode = json["errorCode"];

		if (this.errorCode === UserCourses.OK) {
			this.user = new User(json["user"]);
			this.courses = [];

			for (var i = 0; i < json["courses"].length; i++) {
				this.courses.push(new Course(json["courses"][i]));
			}
		} else {
			this.user = null;
			this.courses = [];
		}
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
