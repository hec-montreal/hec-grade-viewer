import { Component, OnInit, ViewChild } from "@angular/core";

import { UserCourses } from "./../entities/user-courses";
import { SearchFormComponent } from "./search-form.component";
import { CourseListComponent } from "./course-list.component";

@Component({
	selector: "grade-viewer",
	templateUrl: "app/app.component.html"
})
export class AppComponent implements OnInit {
	@ViewChild(CourseListComponent) courseList: CourseListComponent;

	userCourses: UserCourses = null;

	ngOnInit() {

	}

	onSearchCompleted(uc: UserCourses) {
		this.userCourses = uc;
		this.courseList.setUser(uc.user);
		this.courseList.setCourses(uc.courses);
		this.courseList.setSessions(uc.getSessions());
	}
}
