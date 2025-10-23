import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatFormField } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { YouTubePlayer } from '@angular/youtube-player';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';

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
    MatTableModule,
    MatPaginator,
    MatPaginatorModule,
    MatFormFieldModule,
    MatIconModule,
    YouTubePlayer,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
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
    MatPaginator,
    MatPaginatorModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    YouTubePlayer,
    MatDatepickerModule,
    MatDialogModule,
  ],
})
export class SharedModule { }
