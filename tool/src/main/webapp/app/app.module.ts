import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component"
import { SearchFormComponent } from "./search-form.component";
import { CourseListComponent } from "./course-list.component";

@NgModule({
	imports: [ BrowserModule, ReactiveFormsModule ],
	declarations: [ AppComponent, SearchFormComponent, CourseListComponent ],
	bootstrap: [ AppComponent ]
})
export class AppModule {

}
