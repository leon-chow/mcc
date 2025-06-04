import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatFormField } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatSelectModule,
    MatFormField,
    FormsModule,
    MatTableModule
  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatSelectModule,
    MatFormField,
    FormsModule, 
    MatTableModule,
    
  ]
})
export class SharedModule { }
