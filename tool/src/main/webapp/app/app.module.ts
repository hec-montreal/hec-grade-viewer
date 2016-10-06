import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from '@angular/http';
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./components/app.component"
import { SearchFormComponent } from "./components/search-form.component";
import { CourseListComponent } from "./components/course-list.component";
import { AcademicSessionListComponent } from "./components/academic-session-list.component";
import { GridComponent } from "./components/grid.component";

@NgModule({
	imports: [ BrowserModule, ReactiveFormsModule, HttpModule, FormsModule ],
	declarations: [ AppComponent, SearchFormComponent, CourseListComponent, AcademicSessionListComponent, GridComponent ],
	bootstrap: [ AppComponent ]
})
export class AppModule {

}
