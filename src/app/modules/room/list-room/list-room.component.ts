import {
  AfterViewInit,
  Component,
  Injector,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AbstractComponent } from 'src/app/core/abstract.component';
import { RoomDto } from 'src/app/dtos/room.dto';
import { RoomService } from 'src/app/services/room.service';
import { DialogCreateOrUpdateRoomComponent } from './createOrUpdate-room/createOrUpdate-room.component';

@Component({
  selector: 'app-create-room',
  templateUrl: './list-room.component.html',
  styleUrls: ['./list-room.component.scss'],
})
export class ListRoomComponent
  extends AbstractComponent
  implements AfterViewInit
{
  public displayedColumns: string[] = [
    'image',
    'roomId',
    'name',
    'period',
    'isActive',
    'action',
  ];
  public rooms!: RoomDto[];
  public dataSource!: MatTableDataSource<RoomDto>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    injector: Injector,
    private readonly roomService: RoomService,
    public dialog: MatDialog
  ) {
    super(injector);
  }

  ngAfterViewInit(): void {
    this.getRoom();
  }

  private getRoom() {
    this.roomService.getAllRooms().subscribe({
      next: (res) => {
        if (res.data) {
          this.alertService.success();
          this.rooms = res.data.rooms;
          this.dataSource = new MatTableDataSource(this.rooms);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        if (res.errors) {
          this.alertService.error(res.errors[0].message);
        }
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  teste(ele: any) {
    console.log(ele);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogCreateOrUpdateRoomComponent, {
      data: { name: 'teste', animal: 'animal' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}
