import { state, style, transition, trigger, animate } from '@angular/animations';
import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AbstractComponent } from 'src/app/core/abstract.component';
import { RoomService } from 'src/app/services/room.service';
import { RoomDto } from 'src/app/shared/dtos/room.dto';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { StudentDto } from 'src/app/shared/dtos/student.dto';

@Component({
  selector: 'app-report-room',
  templateUrl: './report-room.component.html',
  styleUrls: ['./report-room.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ReportRoomComponent extends AbstractComponent implements OnInit {
  public dataSource!: MatTableDataSource<RoomDto>;
  public displayedColumns = [
    'roomId',
    'name',
    'description',
    'createdAt',
    'period',
    'hourStart',
    'hourEnd',
    'isActive',
    'expand',
  ];
  public expandedElement!: RoomDto | null;
  public columsExport: string[] = [
    'ID',
    'Nome',
    'Descrição',
    'Data de criação',
    'Periodo',
    'Hora início',
    'Hora final',
    'Estudantes',
  ];
  public roomsExport!: RoomDto[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(injector: Injector, private readonly roomService: RoomService) {
    super(injector);
  }

  ngOnInit(): void {
    this.getRooms();
  }

  private getRooms() {
    this.roomService.getAllRooms().subscribe({
      next: (res) => {
        if (res.data) {
          this.dataSource = new MatTableDataSource(res.data.rooms);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          this.roomsExport = res.data.rooms.map((room: RoomDto) => {
            let period: string = '';
            room.period === 'MORNING'
              ? (period = 'Manhã')
              : room.period === 'AFTERNOON'
              ? (period = 'Tarde')
              : room.period === 'NIGHT'
              ? (period = 'Noite')
              : period;

            return {
              roomId: room.roomId,
              name: room.name,
              description: room.description,
              createdAt: room.createdAt ? new Date(+room.createdAt).toLocaleDateString() : null,
              period: period,
              hourStart: room.hourStart,
              hourEnd: room.hourEnd,
              students: room.students?.map((student) => {
                return {
                  nome: student.name,
                  matricula: student.registration,
                  celular: student.phone,
                  cprf: student.cpf,
                };
              }),
            };
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

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public exportExcel() {
    this.excelService.exportAsExcelFile(
      'Relatório de turmas com estudantes',
      '',
      this.columsExport,
      this.roomsExport,
      null,
      'relatorio-turmas-estudantes',
      'Turmas',
    );
  }

  public exportPDF(): void {
    this.generatePdfService.exportPDF([this.columsExport], this.roomsExport, 'Turmas-estudantes');
  }
}
