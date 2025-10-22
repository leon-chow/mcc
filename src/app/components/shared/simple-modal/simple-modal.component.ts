import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-simple-modal',
  imports: [SharedModule],
  templateUrl: './simple-modal.component.html',
  styleUrl: './simple-modal.component.css'
})
export class SimpleModalComponent {
  playlistName = "";
  constructor(private dialogRef: MatDialogRef<SimpleModalComponent>) {}

  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dialogRef.close(this.playlistName)
  }
}
