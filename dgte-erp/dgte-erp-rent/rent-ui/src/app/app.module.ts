import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Components, EntryComponents } from './components';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    Components
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
  ],
  entryComponents: [
    ...EntryComponents
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
