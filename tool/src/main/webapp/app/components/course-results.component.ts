import { Component, ViewChild, Output, EventEmitter } from "@angular/core";

import { User } from "./../entities/user";
import { Course } from "./../entities/course";

@Component({
	moduleId: module.id,
	selector: "course-results",
	templateUrl: "./course-results.component.html"
})
export class CourseResultsComponent {
	@Output() backRequested: EventEmitter<any>;

	user: User;
	course: Course;

	constructor() {
		this.backRequested = new EventEmitter<any>();
	}

	onBackClicked() {
		this.backRequested.emit({});
	}
}
