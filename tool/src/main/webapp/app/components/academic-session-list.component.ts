import { Component, Output, EventEmitter, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup } from '@angular/forms';

import { AcademicSession } from "./../entities/academic-session";

@Component({
	moduleId: module.id,
	selector: "academic-session-list",
	templateUrl: "./academic-session-list.component.html"
})
export class AcademicSessionListComponent implements OnInit {
	@Output() sessionChanged: EventEmitter<any>;

	formBuilder: FormBuilder;

	form: FormGroup;

	sessions: AcademicSession[];
	currentSessionStr: string;

	constructor( @Inject(FormBuilder) formBuilder: FormBuilder) {
		this.formBuilder = formBuilder;

		this.sessionChanged = new EventEmitter();
	}

	ngOnInit() {
		this.form = this.formBuilder.group({
			sessionList: ["none"]
		});
	}

	setSessions(sessions: AcademicSession[]) {
		if (sessions === null) {
			sessions = [];
		}

		this.sessions = sessions;
		this.form.controls["sessionList"].setValue("none");

		this.sessionChanged.emit({
			session: null
		});
	}

	onSessionChanged(event) {
		let emitted: boolean = false;
		let code = event.target.value;

		for (let session of this.sessions) {
			if (session.code === code) {
				this.sessionChanged.emit({
					session: session
				});

				emitted = true;
			}
		}

		if (!emitted) {
			this.sessionChanged.emit({
				session: null
			});
		}
	}
}
