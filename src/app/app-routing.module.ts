import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { StudentComponent } from './modules/student/student.component';
import { LoginComponent } from './modules/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './modules/register/register.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: '',
    component: DefaultComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: DashboardComponent },
      // room
      {
        path: 'room',
        loadChildren: () => import('../app/modules/room/room.module').then((m) => m.RoomModule),
      },

      // student
      {
        path: 'student',
        loadChildren: () => import('../app/modules/student/student.module').then((m) => m.StudentModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
