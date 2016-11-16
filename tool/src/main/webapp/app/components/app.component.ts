import { Component, ViewChild } from "@angular/core";

import { UserCourses } from "./../entities/user-courses";
import { Course } from "./../entities/course";
import { SearchFormComponent } from "./search-form.component";
import { CourseListComponent } from "./course-list.component";
import { CourseResultsComponent } from "./course-results.component";

@Component({
	moduleId: module.id,
	selector: "grade-viewer",
	templateUrl: "./app.component.html"
})
export class AppComponent {
	@ViewChild(CourseListComponent) courseList: CourseListComponent;
	@ViewChild(CourseResultsComponent) courseResults: CourseResultsComponent;

	userCourses: UserCourses = null;

	currentView: string;

	constructor() {
		this.currentView = "courseList";
	}

	onSearchStarted(event) {
		console.log("Search started");

		this.userCourses = null;

		this.courseList.setUser(null);
		this.courseList.setCourses(null);
		this.courseList.setSessions(null);
	}

	onSearchCompleted(event) {
		this.userCourses = event.userCourses;

		this.courseList.setUser(this.userCourses.user);
		this.courseList.setCourses(this.userCourses.courses);
		this.courseList.setSessions(this.userCourses.getSessions());
	}

	onCourseSelected(event) {
		this.courseResults.user = this.userCourses.user;
		this.courseResults.courses = this.userCourses.courses;
		this.courseResults.setCourseIndex(event.index);

		this.currentView = "courseResults";
	}

	onCourseResultsBackRequested() {
		this.currentView = "courseList";
	}
}
