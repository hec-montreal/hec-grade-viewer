import { Component, Input, OnInit, Inject } from "@angular/core";

import { Course } from "./course";
import { Student } from "./student";

@Component({
	moduleId: module.id,
	selector: "course-list",
	templateUrl: "course-list.component.html"
})
export class CourseListComponent implements OnInit {
	defaultRowCount: number = 10;
	defaultRows: number[];

	student: Student;
	courses: Course[];
	sessions: string[];

	constructor() {
		
	}

	ngOnInit() {
		this.courses = [{
			session: "A2016",
			number: "12345",
			title: "Cours 1"
		}, {
			session: "E2016",
			number: "123895",
			title: "Cours 2"
		}];

		this.student = {
			matricule: "11169180",
			fullName: "Simon Grégoire-Gauthier"
		};

		this.sessions = ["A2016", "E2016"]; 

		this.defaultRows = Array(this.defaultRowCount - this.courses.length);
	}
}
