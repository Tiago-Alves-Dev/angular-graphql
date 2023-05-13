import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-create-room',
  templateUrl: './createOrUpdate-room.component.html',
  styleUrls: ['./createOrUpdate-room.component.scss'],
})
export class DialogCreateOrUpdateRoomComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogCreateOrUpdateRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
