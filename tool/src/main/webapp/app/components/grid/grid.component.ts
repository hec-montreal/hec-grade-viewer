import { Component, Output, EventEmitter } from "@angular/core";

import { GridColumn } from "./grid-column";
import { GridRow } from "./grid-row";

@Component({
	moduleId: module.id,
	selector: "grid",
	templateUrl: "./grid.component.html"
})
export class GridComponent {
	@Output() sortRequested: EventEmitter<any>;
	@Output() rowSelected: EventEmitter<any>;

	defaultRowCount: number;
	defaultRows: number[];

	columns: GridColumn[];
	rows: GridRow[];

	emptyDataSetMessage: string;

	interactive: boolean;

	currentSortIndex: number;
	currentSortDirection: number; // 0 down, 1 up

	constructor() {
		this.sortRequested = new EventEmitter();
		this.rowSelected = new EventEmitter();

		this.rows = [];

		this.interactive = true;

		this.currentSortIndex = 0;
		this.currentSortDirection = 0;

		this.setDefaultRowCount(0);
	}

	setDefaultRowCount(count: number) {
		this.defaultRowCount = count;
		this.updateDefaultRows();
		this.defaultRows = Array(this.defaultRowCount - this.rows.length);
	}

	setRows(rows: GridRow[]) {
		this.rows = rows;
		this.updateDefaultRows();
	}

	updateDefaultRows() {
		let size = this.defaultRowCount - this.rows.length;

		if (size <= 0) {
			this.defaultRows = [];
			return;
		}

		this.defaultRows = Array(size);
	}

	onSort(event) {
		let target = event.target || event.srcElement || event.currentTarget;
		let tr = target.parentNode;

		if (tr && tr.attributes && tr.attributes["data-index"]) {
			let index = parseInt(tr.attributes["data-index"].value, 10);

			if (index === this.currentSortIndex) {
				this.currentSortDirection = this.currentSortDirection == 0 ? 1 : 0;
			} else {
				this.currentSortIndex = index;
				this.currentSortDirection = 0;
			}

			this.sortRequested.emit({
				index: this.currentSortIndex,
				direction: this.currentSortDirection
			});
		}
	}

	onRowClick(event) {
		let target = event.target || event.srcElement || event.currentTarget;
		let tr = target.parentNode;

		if (tr && tr.attributes && tr.attributes["data-id"]) {
			this.rowSelected.emit({
				rowId: tr.attributes["data-id"].value
			});
		}
	}
}
