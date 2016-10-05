import { Component, Output, OnInit, Inject, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserCourses } from "./../entities/user-courses";
import { GradesService } from "./../grades.service";

@Component({
	moduleId: module.id,
	selector: "search-form",
	templateUrl: "./search-form.component.html",
	providers: [ GradesService ]
})
export class SearchFormComponent implements OnInit {
	@Output() searchCompleted: EventEmitter<any>;

	formBuilder: FormBuilder;
	gradesService: GradesService;

	searchForm: FormGroup;

	loading:boolean;

	constructor(@Inject(FormBuilder) formBuilder: FormBuilder, @Inject(GradesService) gradesService: GradesService) {
		this.formBuilder = formBuilder;
		this.gradesService = gradesService;
		
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
			this.loading = true;

			this.gradesService.getStudentCourses(this.searchForm.controls["matricule"].value).subscribe(
				(uc: UserCourses) => {
					this.loading = false;
					this.searchCompleted.emit(uc)
			});
		}
	}
}
