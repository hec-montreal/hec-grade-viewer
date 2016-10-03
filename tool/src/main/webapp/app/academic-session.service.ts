import { Injectable } from "@angular/core";

import { AcademicSession } from "./academic-session";

@Injectable()
export class AcademicSessionService {
	getAcademicSessions(): AcademicSession[] {
		return [{code: "A", name: "ANAME"}];
	}
}
