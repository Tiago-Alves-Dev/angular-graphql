import { Component, Inject, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbstractComponent } from 'src/app/core/abstract.component';
import { UploadTypeEnum } from 'src/app/shared/enums/upload.type.enum';
import { RoomService } from 'src/app/services/room.service';
import { RomPeriodEnum } from 'src/app/shared/enums/room-period.enum';
import { v4 as uuid } from 'uuid';
import { RoomDto } from 'src/app/shared/dtos/room.dto';

interface Select {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-create-room',
  templateUrl: './form-room.component.html',
  styleUrls: ['./form-room.component.scss'],
})
export class DialogFormRoomComponent extends AbstractComponent implements OnInit {
  public title!: string;
  public formGroup!: FormGroup;
  public room: RoomDto = {} as RoomDto;
  public imgRoomUrl!: string | any;
  public load: boolean = false;
  public selectedperiodRoom: Select[] = [
    { value: RomPeriodEnum.MORNING, viewValue: 'Manhã' },
    { value: RomPeriodEnum.AFTERNOON, viewValue: 'Tarde' },
    { value: RomPeriodEnum.NIGHT, viewValue: 'Noite' },
  ];

  constructor(
    injector: Injector,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogFormRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RoomDto,
    private readonly roomService: RoomService,
  ) {
    super(injector);
    this.setupForm();
  }

  ngOnInit(): void {
    if (this.data) {
      this.title = 'Alterar';
      this.imgRoomUrl = this.data.image;
      this.formGroup.patchValue(this.data);
    } else {
      this.title = 'Criar';
    }
  }

  private setupForm(): void {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      period: [''],
      hourStart: [''],
      hourEnd: [''],
      isActive: [true],
    });
    this.formGroup.valueChanges.subscribe((value) => {
      this.room = Object.assign(this.room, value);
    });
  }

  public isFieldErrorsRequired(field: string, name: string): any {
    if (this.formGroup.get(field)?.errors?.['required']) {
      let text = name + ' obrigatório';
      return text.toLocaleUpperCase();
    }
  }

  public onSelect(event: any) {
    if (this.imgRoomUrl) {
      this.firebaseService.deleteFile(this.imgRoomUrl).then();
    }

    let file0: File = event.addedFiles ? event.addedFiles[0] : event.target.files[0];
    let name: string = file0.name;
    let extension: string = name.substring(name.lastIndexOf('.'), name.length);

    let reader = new FileReader();
    reader.onload = (file) => {
      if (file0) {
        this.load = true;
        const idFile = `${uuid()}`;
        const filename = `${idFile}.${extension}`;
        this.firebaseService
          .uploadFile(file0, filename, UploadTypeEnum.ROOM)
          .then((snapshot: { url: string; urlSafe: string }) => {
            this.imgRoomUrl = snapshot.url;
            this.load = false;
            if (this.data) {
              this.load = true;
              this.room.image = this.imgRoomUrl;
              this.roomService.updateRoom(this.data.roomId, this.room).subscribe({
                next: (res) => {
                  if (res.data) {
                    this.alertService.success();
                    this.load = false;
                  }
                  if (res.errors) {
                    this.alertService.error(res.errors[0].message);
                    this.load = false;
                  }
                },
                error: (err) => {
                  this.alertService.error('Erro interno -' + err);
                  this.load = false;
                },
              });
            }
          });
      }
    };
    reader.readAsArrayBuffer(file0);
  }

  public deleteFile() {
    this.firebaseService
      .deleteFile(this.imgRoomUrl)
      .then((res: any) => {
        this.alertService.success();
        this.imgRoomUrl = null;
      })
      .catch((err: any) => this.alertService.error(err));
  }

  public onSubmit() {
    this.room.image = this.imgRoomUrl;
    if (this.formGroup.valid) {
      this.load = true;

      if (this.data) {
        // update
        this.roomService.updateRoom(this.data.roomId, this.room).subscribe({
          next: (res) => {
            if (res.data) {
              this.alertService.success();
              this.load = false;
              this.onNoClick();
            }
            if (res.errors) {
              this.alertService.error(res.errors[0].message);
              this.load = false;
            }
          },
          error: (err) => {
            this.alertService.error('Erro interno -' + err);
            this.load = false;
          },
        });
      } else {
        // create
        this.roomService.createRoom(this.room).subscribe({
          next: (res) => {
            if (res.data) {
              this.alertService.success();
              this.load = false;
              this.onNoClick();
            }
            if (res.errors) {
              this.alertService.error(res.errors[0].message);
              this.load = false;
            }
          },
          error: (err) => {
            this.alertService.error('Erro interno -' + err);
            this.load = false;
          },
        });
      }
    }
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
}
