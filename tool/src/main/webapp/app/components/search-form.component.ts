import { Component, Output, OnInit, Inject, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserCourses } from "./../entities/user-courses";
import { GradesService } from "./../grades.service";

@Component({
	moduleId: module.id,
	selector: "search-form",
	templateUrl: "./search-form.component.html",
	providers: [GradesService]
})
export class SearchFormComponent implements OnInit {
	@Output() searchStarted: EventEmitter<any>;
	@Output() searchCompleted: EventEmitter<any>;

	formBuilder: FormBuilder;
	gradesService: GradesService;

	errorMessage: string;

	searchForm: FormGroup;

	loading: boolean;

	constructor( @Inject(FormBuilder) formBuilder: FormBuilder, @Inject(GradesService) gradesService: GradesService) {
		this.formBuilder = formBuilder;
		this.gradesService = gradesService;

		this.errorMessage = "";

		this.searchStarted = new EventEmitter();
		this.searchCompleted = new EventEmitter();

		this.loading = false;
	}

	ngOnInit() {
		this.searchForm = this.formBuilder.group({
			matricule: ["", Validators.required]
		});
	}

	onSubmit() {
		if (this.searchForm.valid) {
			this.searchStarted.emit({});

			this.loading = true;
			this.errorMessage = "";

			this.gradesService.getStudentCourses(this.searchForm.controls["matricule"].value).subscribe(
				(uc: UserCourses) => { this.completeSearch(uc); },
				error => { this.handleError(error); });
		}
	}

	completeSearch(uc: UserCourses) {
		this.loading = false;

		if (uc.errorCode !== UserCourses.OK) {
			this.showError("L'usager n'existe pas");
		} else {
			this.searchCompleted.emit({
				userCourses: uc
			});
		}
	}

	handleError(error) {
		this.loading = false;

		this.showError(error);
	}

	showError(msg: string) {
		this.errorMessage = msg;
	}
}
