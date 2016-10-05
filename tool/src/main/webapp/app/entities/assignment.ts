import { Grade } from "./grade";

export class Assignment {
	id: string;
	name: string;
	date: string;
	formattedDate: string;
	categoryId: string;
	categoryName: string;
	points: number;
	grade: Grade;
}
