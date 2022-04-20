import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgApexchartsModule } from 'ng-apexcharts';

// components
import { LoadingComponent } from './components/loading/loading.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { LineComponent } from './components/charts/line/line.component';

// material modules
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';

// Directives
import { IsEnglishDirective } from './directives/is-english/is-english.directive';

@NgModule({
  declarations: [
    LoadingComponent,
    DropdownComponent,
    LineComponent,
    IsEnglishDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgApexchartsModule,
    MatListModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatInputModule,
    MatSelectModule
  ],
  exports: [
    LoadingComponent,
    DropdownComponent,
    LineComponent,

    IsEnglishDirective,

    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgApexchartsModule,
    MatListModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class SharedModule { }
