import { Component, Inject, Injector, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbstractComponent } from 'src/app/core/abstract.component';
import { RoomDto } from 'src/app/dtos/room.dto';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-modal-delete-room',
  templateUrl: './modal-delete-room.component.html',
  styleUrls: ['./modal-delete-room.component.scss'],
})
export class ModalDeleteRoomComponent extends AbstractComponent implements OnInit {
  public load: boolean = false;

  constructor(
    injector: Injector,
    private readonly roomService: RoomService,
    public dialogRef: MatDialogRef<ModalDeleteRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RoomDto,
  ) {
    super(injector);
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  public deleteRoom() {
    this.load = true;
    this.roomService.deleteRoom(this.data.roomId).subscribe({
      next: (res) => {
        if (res.data) {
          this.alertService.success();
          this.load = false;
        }

        if (res.errors) {
          console.log(res);
          this.alertService.error(res.errors[0].message);
          this.load = false;
        }

        this.onNoClick();
      },
      error: (err) => {
        console.log(err);
        this.alertService.error('Erro interno -' + err);
        this.load = false;
      },
    });
  }
}
