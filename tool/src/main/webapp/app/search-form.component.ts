import { Component, Input, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	moduleId: module.id,
	selector: "search-form",
	templateUrl: "search-form.component.html"
})
export class SearchFormComponent implements OnInit {
	searchForm: FormGroup;

	constructor(@Inject(FormBuilder) private formBuilder:FormBuilder) {

	}

	ngOnInit() {
		this.searchForm = this.formBuilder.group({
			matricule: ["", Validators.required]
		});
	}

	onSubmit() {
		console.log(this.searchForm);
	}
}
