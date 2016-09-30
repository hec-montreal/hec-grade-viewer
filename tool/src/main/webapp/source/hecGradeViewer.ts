import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { SearchModule } from './module/search.module';

const platform = platformBrowserDynamic();

platform.bootstrapModule(SearchModule);