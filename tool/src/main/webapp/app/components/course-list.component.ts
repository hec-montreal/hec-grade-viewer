import { Component, Input, OnInit, Inject, ViewChild } from "@angular/core";

import { Course } from "./../entities/course";
import { User } from "./../entities/user";
import { AcademicSession } from "./../entities/academic-session";
import { AcademicSessionListComponent } from "./academic-session-list.component";
import { GridComponent } from "./grid.component";
import { GridColumn } from "./grid-column";

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
	currentSession: AcademicSession;

	constructor() {

	}

	ngOnInit() {
		this.grid.columns = [
			new GridColumn("Session", "session"),
			new GridColumn("Numéro de cours", "courseNumber"),
			new GridColumn("Titre", "title")
		];

		this.currentSession = null;
	}

	setUser(user: User) {
		this.user = user;
	}

	setSessions(sessions: AcademicSession[]) {
		this.sessionList.setSessions(sessions);
	}

	setCourses(courses: Course[]) {
		this.courses = courses;

		this.grid.setRows(this.makeGridArray(this.grid.currentSortIndex, this.grid.currentSortDirection));
	}

	onCoursesSort(event) {
		this.grid.setRows(this.makeGridArray(event.index, event.direction));
	}

	onSessionChanged(session: AcademicSession) {
		this.currentSession = session;

		this.grid.setRows(this.makeGridArray(this.grid.currentSortIndex, this.grid.currentSortDirection));
	}

	makeGridArray(sortIndex: number, sortDirection: number): string[][] {
		this.courses = this.courses;

		let rows = [];

		console.log("Make grid array with sindex = " + sortIndex + ", sdir = " + sortDirection + ", currentSession = " + (this.currentSession == null ? "null" : this.currentSession.code));

		for (let course of this.courses) {
			let go: boolean = true;

			if (this.currentSession != null) {
				if (course.session == null || course.session.code == null || course.session.code.length == 0 || course.session.code !== this.currentSession.code) {
					go = false;
				}
			}

			if (go) {
				rows.push([course.session.name, course.number, course.description]);
			}
		}

		rows = rows.sort((a: string[], b: string[]) => {
			if (sortDirection === 0) {
				return a[sortIndex].localeCompare(b[sortIndex]);
			} else {
				return b[sortIndex].localeCompare(a[sortIndex]);
			}
		});

		return rows;
	}
}
