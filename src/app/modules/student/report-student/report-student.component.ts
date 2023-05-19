import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AbstractComponent } from 'src/app/core/abstract.component';
import { StudentService } from 'src/app/services/student.service';
import { StudentDto } from 'src/app/shared/dtos/student.dto';

@Component({
  selector: 'app-report-student',
  templateUrl: './report-student.component.html',
  styleUrls: ['./report-student.component.scss'],
})
export class ReportStudentComponent extends AbstractComponent implements OnInit {
  public displayedColumns: string[] = [
    'studentId',
    'registration',
    'name',
    'email',
    'phone',
    'cpf',
    'birth',
    'age',
    'address',
    'createdAt',
    'room',
    'isActive',
  ];
  public columsExport: string[] = [
    'Matrícula',
    'Nome',
    'Email',
    'Celular',
    'CPF',
    'Aniversário',
    'Idade',
    'Data de criação',
    'Endereço',
    'Nome da mãe',
    'Nome do Pai',
    'Turma',
    'Status',
  ];
  public studens!: StudentDto[];
  public studentExport!: StudentDto[];
  public dataSource!: MatTableDataSource<StudentDto>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(injector: Injector, public readonly studentService: StudentService) {
    super(injector);
  }

  ngOnInit(): void {
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
              birth: student.birth ? new Date(+student.birth).toLocaleDateString() : null,
              age: student.age,
              createdAt: student.createdAt ? new Date(+student.createdAt).toLocaleDateString() : null,
              address: student.address + ' - ' + student.addressNumber + ' - ' + student.city,
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

  public exportExcel() {
    this.excelService.exportAsExcelFile(
      'Relatório de Alunos',
      '',
      this.columsExport,
      this.studentExport,
      null,
      'relatorio-alunos',
      'Alunos',
    );
  }

  public exportPDF(): void {
    this.generatePdfService.exportPDF([this.columsExport], this.studentExport, 'Relatório de Alunos');
  }
}
