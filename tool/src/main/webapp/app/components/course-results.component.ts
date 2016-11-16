import { Component, ViewChild, Output, EventEmitter, OnInit } from "@angular/core";

import { User } from "./../entities/user";
import { Course } from "./../entities/course";
import { Assignment } from "./../entities/assignment";
import { GridComponent } from "./grid/grid.component";
import { GridColumn } from "./grid/grid-column";
import { GridRow } from "./grid/grid-row";

@Component({
	moduleId: module.id,
	selector: "course-results",
	templateUrl: "./course-results.component.html"
})
export class CourseResultsComponent implements OnInit {
	@Output() backRequested: EventEmitter<any>;

	@ViewChild(GridComponent) grid: GridComponent;

	user: User;
	courses: Course[];
	courseIndex: number;

	constructor() {
		this.backRequested = new EventEmitter<any>();
	}

	ngOnInit() {
		this.grid.columns = [
			new GridColumn("Date", "date"),
			new GridColumn("Évaluation", "title"),
			new GridColumn("Catégorie", "category"),
			new GridColumn("Noté sur", "gradeOn"),
			new GridColumn("Résultat", "result"),
			new GridColumn("Publié", "published"),
			new GridColumn("Commentaire", "comment")
		];

		this.grid.emptyDataSetMessage = "Aucun résultats intermédiaires définis pour ce cours";

		this.grid.interactive = false;
	}

	setCourseIndex(index: number) {
		this.courseIndex = index;

		this.grid.setRows(this.makeGrid(this.grid.currentSortIndex, this.grid.currentSortDirection));
	}

	onBackClicked() {
		this.backRequested.emit({});
	}

	onAssignmentsSort(event) {
		this.grid.setRows(this.makeGrid(event.index, event.direction));
	}

	onPreviousCourse() {
		if (this.courseIndex - 1 > 0) {
			this.setCourseIndex(this.courseIndex - 1);
		}
	}

	onNextCourse() {
		if (this.courseIndex + 1 < this.courses.length) {
			this.setCourseIndex(this.courseIndex + 1);
		}
	}

	makeGrid(sortIndex: number, sortDirection: number): GridRow[] {
		let rows: GridRow[] = [];
		let course = this.courses[this.courseIndex];

		course.assignments = course.assignments.sort((a: Assignment, b: Assignment) => {
			let aa = sortDirection === 0 ? a : b;
			let ab = sortDirection === 0 ? b : a;

			if (sortIndex === 0) { // Date
				if (aa.date === 0) {
					return 1;
				}

				if (ab.date === 0) {
					return -1;
				}

				return aa.date - ab.date;
			} else if (sortIndex === 1) { // Titre
				return aa.name.localeCompare(ab.name);
			} else if (sortIndex === 2) { // Categorie
				return aa.categoryName.localeCompare(ab.categoryName);
			} else if (sortIndex === 3) { // GradeOn
				return aa.points - ab.points;
			} else if (sortIndex === 4) { // Resultat
				return aa.grade.value - ab.grade.value;
			} else if (sortIndex === 5) { // Publié
				return aa.grade.published ? 1 : -1;
			} else if (sortIndex === 6) { // Commentaire
				return aa.grade.comment.localeCompare(ab.grade.comment);
			}

			return 0;
		});

		for (let assignment of course.assignments) {
			rows.push(new GridRow(assignment.id, [assignment.formattedDate, assignment.name, assignment.categoryName, assignment.points.toString(), assignment.grade.getFinalValue(), assignment.grade.published ? "Oui" : "Non", assignment.grade.comment]));
		}

		if (rows.length > 0) {
			rows.push(new GridRow("total", ["", "Total du cours", "", "", course.courseGrade.getFinalValue(), "", ""]));
		}

		return rows;
	}
}
