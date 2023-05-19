import { Component, Injector, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbstractComponent } from 'src/app/core/abstract.component';
import { StudentService } from 'src/app/services/student.service';
import { StudentDto } from 'src/app/shared/dtos/student.dto';

@Component({
  selector: 'app-modal-delete-student',
  templateUrl: './modal-delete-student.component.html',
  styleUrls: ['./modal-delete-student.component.scss'],
})
export class ModalDeleteStudentComponent extends AbstractComponent implements OnInit {
  public load: boolean = false;
  public studentsExists: boolean = false;

  constructor(
    injector: Injector,
    private readonly studentService: StudentService,
    public dialogRef: MatDialogRef<ModalDeleteStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StudentDto,
  ) {
    super(injector);
  }

  ngOnInit(): void {}

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public deleteStutend() {
    this.load = true;
    this.studentService.deleteStudent(this.data.studentId).subscribe({
      next: (res) => {
        if (res.data) {
          this.alertService.success();
          this.load = false;
        }

        if (res.errors) {
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
