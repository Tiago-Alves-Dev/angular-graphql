import { AfterViewInit, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AbstractComponent } from 'src/app/core/abstract.component';
import { RoomService } from 'src/app/services/room.service';
import { DialogFormRoomComponent } from './form-room/form-room.component';
import { ModalDeleteRoomComponent } from './modal-delete-room/modal-delete-room.component';
import { RoomDto } from 'src/app/shared/dtos/room.dto';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-create-room',
  templateUrl: './list-room.component.html',
  styleUrls: ['./list-room.component.scss'],
})
export class ListRoomComponent extends AbstractComponent implements AfterViewInit {
  public displayedColumns: string[] = ['image', 'roomId', 'name', 'createdAt', 'period', 'isActive', 'action'];
  public columsExport: string[] = [
    'ID',
    'Nome',
    'Descrição',
    'Data de criação',
    'Periodo',
    'Hora início',
    'Hora final',
    'Status',
  ];
  public rooms!: RoomDto[];
  public roomsExport!: RoomDto[];
  public dataSource!: MatTableDataSource<RoomDto>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(injector: Injector, private readonly roomService: RoomService, public dialog: MatDialog) {
    super(injector);
  }

  ngAfterViewInit(): void {
    this.getRooms();
  }

  private getRooms() {
    this.roomService.getAllRooms().subscribe({
      next: (res) => {
        if (res.data) {
          this.rooms = res.data.rooms;
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
              status: room.isActive ? 'Ativo' : 'Inativo',
            };
          });
          this.dataSource = new MatTableDataSource(this.rooms);
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

  public openDialogForm(data?: RoomDto): void {
    const dialogRef = this.dialog.open(DialogFormRoomComponent, {
      data: data,
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getRooms();
    });
  }

  public openDialogDelete(data?: RoomDto): void {
    const dialogRef = this.dialog.open(ModalDeleteRoomComponent, {
      data: data,
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getRooms();
    });
  }

  public exportExcel() {
    this.excelService.exportAsExcelFile(
      'Relatório de turmas',
      '',
      this.columsExport,
      this.roomsExport,
      null,
      'relatorio-turmas',
      'Turmas',
    );
  }

  public exportPDF(): void {
    this.generatePdfService.exportPDF([this.columsExport], this.roomsExport, 'Turmas');
  }
}
