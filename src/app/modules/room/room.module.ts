import { NgModule } from '@angular/core';
import { ListRoomComponent } from './list-room/list-room.component';
import { ReportRoomComponent } from './report-room/report-room.component';
import { RoomComponent } from './room.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { DialogCreateOrUpdateRoomComponent } from './list-room/createOrUpdate-room/createOrUpdate-room.component';

@NgModule({
  declarations: [
    ListRoomComponent,
    ReportRoomComponent,
    RoomComponent,
    DialogCreateOrUpdateRoomComponent,
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
        ],
      },
    ]),
    SharedModule,
  ],
})
export class RoomModule {}
