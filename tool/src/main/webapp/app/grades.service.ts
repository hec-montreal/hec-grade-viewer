import { Inject, Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { UserCourses } from "./entities/user-courses";

@Injectable()
export class GradesService {
	private baseSvcUrl: string = "./svc";

	http: Http;

	constructor(@Inject(Http) http: Http) {
		this.http = http;
	}

	getStudentCourses(matricule: String): Observable<UserCourses> {
		return this.http.get(this.baseSvcUrl + "/grades/" + matricule)
					    .map((res: Response) => this.makeStudentCourses(res))
					    .catch((error: any) => Observable.throw(error.json().error || "Server error"));
	}

	private makeStudentCourses(res: Response) : UserCourses {
		return new UserCourses(res.json());
	}
}
