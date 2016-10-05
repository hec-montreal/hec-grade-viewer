import { Component } from "@angular/core";

import { AcademicSession } from "./../entities/academic-session";

@Component({
	moduleId: module.id,
	selector: "academic-session-list",
	templateUrl: "./academic-session-list.component.html"
})
export class AcademicSessionListComponent {
	sessions: AcademicSession[];

	constructor() {

	}

	setSessions(sessions: AcademicSession[]) {
		this.sessions = sessions;
	}
}
