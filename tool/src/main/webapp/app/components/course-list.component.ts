import { Component, Input, OnInit, Inject, ViewChild } from "@angular/core";

import { Course } from "./../entities/course";
import { User } from "./../entities/user";
import { AcademicSession } from "./../entities/academic-session";
import { AcademicSessionListComponent } from "./academic-session-list.component";
import { GridComponent } from "./grid.component";

@Component({
	moduleId: module.id,
	selector: "course-list",
	templateUrl: "./course-list.component.html"
})
export class CourseListComponent implements OnInit {
	@ViewChild(AcademicSessionListComponent) sessionList: AcademicSessionListComponent;
	@ViewChild(GridComponent) grid: GridComponent;

	user: User;
	courses: Course[];

	constructor() {

	}

	ngOnInit() {
		this.grid.headerTitles = ["Session", "Numéro de cours", "Titre"];
		this.grid.rows = [
			["S1", "wioweuf89023", "Test"],
			["S2", "we890fuwe890fu", "Hola"]
		];
	}

	setUser(user: User) {
		this.user = user;
	}

	setSessions(sessions: AcademicSession[]) {
		this.sessionList.setSessions(sessions);
	}
}
