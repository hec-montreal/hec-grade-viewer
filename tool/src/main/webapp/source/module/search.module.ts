import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SearchComponent }   from '../component/search.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ SearchComponent ],
  bootstrap:    [ SearchComponent ]
})
export class SearchModule { }