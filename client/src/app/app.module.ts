import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProductListComponent,SendMailDialog,TemplateDialog,StatisticsDialog } from './product-list/product-list.component';
import { MatSliderModule } from '@angular/material/slider';
import {MatListModule} from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSelectModule} from '@angular/material/select';
import {CallbackPipe } from './callback.pipe';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import {MatIconModule} from '@angular/material/icon'
import {MatDialogModule} from '@angular/material/dialog';
import { AngularFontAwesomeModule } from 'angular-font-awesome'; //https://www.npmjs.com/package/angular-font-awesome
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import { MatSnackBarModule } from "@angular/material";
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
  imports: [
    VirtualScrollerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatMenuModule,
    FormsModule,
    MatButtonModule, 
    AngularFontAwesomeModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    HttpClientModule,
    MatSliderModule,
    MatListModule, 
    BrowserModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatCardModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot([
      { path: '', component: ProductListComponent },
    ])
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductListComponent,
    CallbackPipe,
    SendMailDialog,
    StatisticsDialog,
    TemplateDialog
   
  ],
  entryComponents: [
    SendMailDialog,
    StatisticsDialog,
    TemplateDialog
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/