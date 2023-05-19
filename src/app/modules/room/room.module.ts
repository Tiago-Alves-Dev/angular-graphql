import { NgModule } from '@angular/core';
import { ListRoomComponent } from './list-room/list-room.component';
import { ReportRoomComponent } from './report-room/report-room.component';
import { RoomComponent } from './room.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { DialogFormRoomComponent } from './list-room/form-room/form-room.component';
import { ModalDeleteRoomComponent } from './list-room/modal-delete-room/modal-delete-room.component';
import { DetailsRoomComponent } from './details-room/details-room.component';

@NgModule({
  declarations: [
    ListRoomComponent,
    ReportRoomComponent,
    RoomComponent,
    DialogFormRoomComponent,
    ModalDeleteRoomComponent,
    DetailsRoomComponent,
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: RoomComponent,
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },
          {
            path: 'list',
            component: ListRoomComponent,
          },
          {
            path: 'report',
            component: ReportRoomComponent,
          },
          {
            path: ':id',
            component: DetailsRoomComponent,
          },
        ],
      },
    ]),
    SharedModule,
  ],
})
export class RoomModule {}
