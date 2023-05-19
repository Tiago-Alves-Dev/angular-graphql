import { Component, Inject, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbstractComponent } from 'src/app/core/abstract.component';
import { CepService } from 'src/app/services/integrations/cep.service';
import { RoomService } from 'src/app/services/room.service';
import { StudentService } from 'src/app/services/student.service';
import { RoomDto } from 'src/app/shared/dtos/room.dto';
import { StudentDto } from 'src/app/shared/dtos/student.dto';
import { UploadTypeEnum } from 'src/app/shared/enums/upload.type.enum';
import { v4 as uuid } from 'uuid';

interface Select {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-form-student',
  templateUrl: './form-student.component.html',
  styleUrls: ['./form-student.component.scss'],
})
export class DialogFormStudentComponent extends AbstractComponent implements OnInit {
  public title!: string;
  public formGroup!: FormGroup;
  public student: StudentDto = {} as StudentDto;
  public photoStudentUrl!: string | any;
  public load: boolean = false;
  public selectedRoom!: Select[];

  constructor(
    injector: Injector,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogFormStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StudentDto,
    private readonly studentService: StudentService,
    private readonly roomService: RoomService,
    private readonly cepService: CepService,
  ) {
    super(injector);
    this.setupForm();
  }

  ngOnInit(): void {
    if (this.data) {
      this.title = 'Alterar';
      this.photoStudentUrl = this.data.photo;
      this.data.birth = new Date(+this.data.birth);
      console.log(this.data);
      this.formGroup.patchValue(this.data);
    } else {
      this.title = 'Criar';
    }
    this.getRooms();
  }

  private setupForm(): void {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      roomId: ['', [Validators.required]],
      registration: [{ value: this.generateRegistration(), disabled: true }],
      age: ['', [Validators.required]],
      birth: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      mother: ['', [Validators.required]],
      father: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      address: [''],
      addressNumber: [''],
      addressComplement: [''],
      zipcode: [''],
      city: [''],
      state: [''],
      isActive: [true],
    });
    this.formGroup.valueChanges.subscribe((value) => {
      this.student = Object.assign(this.student, value);
    });
  }

  public getCep(cep: string) {
    cep = cep.replace('-', '');
    cep = cep.replace('.', '');

    this.cepService
      .getInfoCep(cep)
      .then((res) => {
        this.formGroup.patchValue({ address: res.data.logradouro });
        this.formGroup.patchValue({ city: res.data.localidade });
        this.formGroup.patchValue({ state: res.data.uf });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private getRooms() {
    this.roomService.getAllRooms().subscribe({
      next: (res) => {
        if (res.data) {
          this.selectedRoom = res.data.rooms.map((room: RoomDto) => {
            return { value: room.roomId, viewValue: room.name };
          });
        }
        if (res.errors) {
          this.alertService.error(res.errors[0].message);
        }
      },
      error: (err) => {
        this.alertService.error('Erro interno');
      },
    });
  }

  public isFieldErrorsRequired(field: string, name: string): any {
    if (this.formGroup.get(field)?.errors?.['required']) {
      let text = name + ' obrigatório';
      return text.toLocaleUpperCase();
    }
  }

  public generateRegistration() {
    var randomized = Math.ceil(Math.random() * Math.pow(10, 6));
    return randomized + '/' + new Date().getFullYear();
  }

  public onSelect(event: any) {
    if (this.photoStudentUrl) {
      this.firebaseService.deleteFile(this.photoStudentUrl).then();
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
          .uploadFile(file0, filename, UploadTypeEnum.STUDENT)
          .then((snapshot: { url: string; urlSafe: string }) => {
            this.photoStudentUrl = snapshot.url;
            this.load = false;
            if (this.data) {
              this.load = true;
              this.student.photo = this.photoStudentUrl;
              this.studentService.updateStudent(this.data.studentId, this.student).subscribe({
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
      .deleteFile(this.photoStudentUrl)
      .then((res: any) => {
        this.alertService.success();
        this.photoStudentUrl = null;
      })
      .catch((err: any) => this.alertService.error(err));
  }

  public onSubmit() {
    this.student.photo = this.photoStudentUrl;
    this.student.registration = this.formGroup.get('registration')?.value;
    if (this.formGroup.valid) {
      this.load = true;

      if (this.data) {
        // update
        this.studentService.updateStudent(this.data.studentId, this.student).subscribe({
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
        this.studentService.createStudent(this.student).subscribe({
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
