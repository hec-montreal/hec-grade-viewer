import { Component } from "@angular/core";

@Component({
	moduleId: module.id,
	selector: "grid",
	templateUrl: "./grid.component.html"
})
export class GridComponent {
	defaultRowCount: number;
	defaultRows: number[];

	headerTitles: string[];

	rows: string[][];

	constructor() {
		this.rows = [];

		this.setDefaultRowCount(10);
	}

	setDefaultRowCount(count: number) {
		this.defaultRowCount = count;
		this.defaultRows = Array(this.defaultRowCount - this.rows.length);
	}
}
