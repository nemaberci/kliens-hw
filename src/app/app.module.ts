import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';

import {MatIconModule} from "@angular/material/icon";
import { TranslatePageComponent } from './translate/translate-page/translate-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {HttpClientModule} from "@angular/common/http";
import {MatTabsModule} from "@angular/material/tabs";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {MatListModule} from "@angular/material/list";
import {MatTooltipModule} from "@angular/material/tooltip";
import {ClipboardModule} from "@angular/cdk/clipboard";
import { ThesaurusComponent } from './thesaurus/thesaurus/thesaurus.component';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            {path: '', component: TranslatePageComponent},
            {path: 'thesaurus', component: ThesaurusComponent}
        ]),
        MatIconModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatSidenavModule,
        MatToolbarModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
        HttpClientModule,
        MatTabsModule,
        MatCardModule,
        MatTableModule,
        MatListModule,
        MatTooltipModule,
        ClipboardModule
    ],
  declarations: [
    AppComponent,
    TopBarComponent,
    TranslatePageComponent,
    ThesaurusComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/