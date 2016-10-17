import { Component, Input, OnInit, Inject, ViewChild, Output, EventEmitter } from "@angular/core";

import { Course } from "./../entities/course";
import { User } from "./../entities/user";
import { AcademicSession } from "./../entities/academic-session";
import { AcademicSessionListComponent } from "./academic-session-list.component";
import { GridComponent } from "./grid/grid.component";
import { GridColumn } from "./grid/grid-column";
import { GridRow } from "./grid/grid-row";

@Component({
	moduleId: module.id,
	selector: "course-list",
	templateUrl: "./course-list.component.html"
})
export class CourseListComponent implements OnInit {
	@Output() courseSelected: EventEmitter<any>;

	@ViewChild(AcademicSessionListComponent) sessionList: AcademicSessionListComponent;
	@ViewChild(GridComponent) grid: GridComponent;

	user: User;
	courses: Course[];
	currentSession: AcademicSession;

	constructor() {
		this.courseSelected = new EventEmitter<any>();
	}

	ngOnInit() {
		this.grid.columns = [
			new GridColumn("Session", "session"),
			new GridColumn("Numéro de cours", "courseNumber"),
			new GridColumn("Titre", "title"),
			new GridColumn("Résultat intermédiaire", "result")
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

		this.grid.setRows(this.makeGrid(this.grid.currentSortIndex, this.grid.currentSortDirection));
	}

	onCoursesSort(event) {
		this.grid.setRows(this.makeGrid(event.index, event.direction));
	}

	onSessionChanged(event) {
		this.currentSession = event.session;

		this.grid.setRows(this.makeGrid(this.grid.currentSortIndex, this.grid.currentSortDirection));
	}

	onCourseSelected(event) {
		let courseNumber: string = event.rowId;

		for (let i = 0; i < this.courses.length; i++) {
			if (this.courses[i].number === courseNumber) {
				this.courseSelected.emit({
					index: i
				});
			}
		}
	}

	makeGrid(sortIndex: number, sortDirection: number): GridRow[] {
		if (this.courses === null) {
			return [];
		}

		this.courses = this.courses.sort((a: Course, b: Course) => {
			let ca: Course = sortDirection === 0 ? a : b;
			let cb: Course = sortDirection === 0 ? b : a;

			if (sortIndex === 0) { // Session
				return ca.session.compareTo(cb.session);
			} else if (sortIndex === 1) { // Numéro de cours
				return ca.number.localeCompare(cb.number);
			} else if (sortIndex === 2) { // Titre
				return ca.description.localeCompare(cb.description);
			} else if (sortIndex === 3) { // Résultats
				return ca.courseGrade.compareTo(cb.courseGrade);
			}

			return 0;
		});

		let rows: GridRow[] = [];

		for (let course of this.filterCourses()) {
			rows.push(new GridRow(course.number, [course.session.name, course.number, course.description, course.courseGrade.getFinalValue()]));
		}

		return rows;
	}

	filterCourses(): Course[] {
		let ret: Course[] = [];

		let filter = (course: Course, currentSession: AcademicSession): boolean => {
			return currentSession === null ? true : (course.session != null && course.session.code === currentSession.code);
		};

		for (let course of this.courses) {
			if (!filter(course, this.currentSession)) {
				continue;
			}

			ret.push(course);
		}

		return ret;
	}
}
