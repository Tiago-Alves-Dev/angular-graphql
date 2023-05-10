import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { StudentComponent } from './modules/student/student.component';
import { RoomComponent } from './modules/room/room.component';

const routes: Routes = [
  // { path: '', component: LoginComponent },
  // { path: 'login', component: LoginComponent },

  {
    path: '',
    component: DefaultComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'student', component: StudentComponent },
      { path: 'room', component: RoomComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
