import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import {bootstrapApplication} from "@angular/platform-browser";
import {HomeComponent} from "./app/components/home/home.component";
import {importProvidersFrom} from "@angular/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";


bootstrapApplication(HomeComponent, {
  providers: [importProvidersFrom(BrowserAnimationsModule, BrowserAnimationsModule), importProvidersFrom(HttpClientModule)],
});
