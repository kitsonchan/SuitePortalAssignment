import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';
import { AdminHomeComponent } from './admin-home.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AdminHomeComponent],
  exports: [AdminHomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule
  ]
})
export class AdminHomeModule { }
