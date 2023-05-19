import { StudentService } from './../../../services/student.service';
import { AfterViewInit, Component, Injector, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AbstractComponent } from 'src/app/core/abstract.component';
import { StudentDto } from 'src/app/shared/dtos/student.dto';
import { DialogFormStudentComponent } from './form-student/form-student.component';
import { ModalDeleteStudentComponent } from './modal-delete-student/modal-delete-student.component';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.scss'],
})
export class ListStudentComponent extends AbstractComponent implements AfterViewInit {
  public displayedColumns: string[] = [
    'photo',
    'registration',
    'name',
    'email',
    'phone',
    'turma',
    'isActive',
    'action',
  ];
  public columsExport: string[] = [
    'Matrícula',
    'Nome',
    'Email',
    'Celular',
    'CPF',
    'Nome da Mãe',
    'Nome do Pai',
    'Turma',
    'Status',
  ];
  public studens!: StudentDto[];
  public studentExport!: StudentDto[];
  public dataSource!: MatTableDataSource<StudentDto>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(injector: Injector, public dialog: MatDialog, public readonly studentService: StudentService) {
    super(injector);
  }

  ngAfterViewInit(): void {
    this.getStudens();
  }

  private getStudens() {
    this.studentService.getAllStudents().subscribe({
      next: (res) => {
        if (res.data) {
          this.studens = res.data.students;
          this.studentExport = res.data.students.map((student: StudentDto) => {
            return {
              registration: student.registration,
              name: student.name,
              email: student.email,
              phone: student.phone,
              cpf: student.cpf,
              mother: student.mother,
              father: student.father,
              room: student.room?.name,
              status: student.isActive ? 'Ativo' : 'Inativo',
            };
          });
          this.dataSource = new MatTableDataSource(this.studens);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
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

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public openDialogForm(data?: StudentDto): void {
    const dialogRef = this.dialog.open(DialogFormStudentComponent, {
      data: data,
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getStudens();
    });
  }

  public openDialogDelete(data?: StudentDto): void {
    const dialogRef = this.dialog.open(ModalDeleteStudentComponent, {
      data: data,
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getStudens();
    });
  }

  public exportExcel() {
    this.excelService.exportAsExcelFile('Alunos', '', this.columsExport, this.studentExport, null, 'alunos', 'Alunos');
  }

  public exportPDF(): void {
    this.generatePdfService.exportPDF([this.columsExport], this.studentExport, 'Alunos');
  }
}
