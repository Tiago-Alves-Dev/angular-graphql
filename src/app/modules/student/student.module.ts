import { NgModule } from '@angular/core';
import { StudentComponent } from './student.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ListStudentComponent } from './list-student/list-student.component';
import { ReportStudentComponent } from './report-student/report-student.component';
import { DetailsStudentComponent } from './details-student/details-student.component';
import { DialogFormStudentComponent } from './list-student/form-student/form-student.component';
import { ModalDeleteStudentComponent } from './list-student/modal-delete-student/modal-delete-student.component';

@NgModule({
  declarations: [
    StudentComponent,
    ListStudentComponent,
    ReportStudentComponent,
    DetailsStudentComponent,
    DialogFormStudentComponent,
    ModalDeleteStudentComponent,
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: StudentComponent,
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },
          {
            path: 'list',
            component: ListStudentComponent,
          },
          {
            path: 'report',
            component: ReportStudentComponent,
          },
          {
            path: ':id',
            component: DetailsStudentComponent,
          },
        ],
      },
    ]),
    SharedModule,
  ],
})
export class StudentModule {}
