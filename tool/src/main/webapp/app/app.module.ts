import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component"
import { SearchPanelComponent } from "./search-panel.component"
import { ResultPanelComponent } from "./result-panel.component"

@NgModule({
	imports: [ BrowserModule ],
	declarations: [ AppComponent, SearchPanelComponent, ResultPanelComponent ],
	bootstrap: [ AppComponent ]
})
export class AppModule {

}
