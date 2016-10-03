import { Component, OnInit, Inject } from "@angular/core";

import { AcademicSession } from "./academic-session";
import { AcademicSessionService } from "./academic-session.service"

@Component({
	selector: "search-panel",
	templateUrl: "app/search-panel.component.html",
	providers: [AcademicSessionService]
})
export class SearchPanelComponent implements OnInit {

	academicSessions: AcademicSession[];

	constructor(@Inject(AcademicSessionService) private academicSessionService: AcademicSessionService) {

	}

	ngOnInit(): void {
		this.academicSessions = this.academicSessionService.getAcademicSessions();

		console.log(this.academicSessions);
	}
}
