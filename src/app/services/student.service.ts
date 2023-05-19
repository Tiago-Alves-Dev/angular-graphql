import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import { GET_ALL_STUDENTS } from '../shared/queries/getAllStudent.query';
import { GET_STUDENT } from '../shared/queries/getStudent.query';
import { StudentDto } from '../shared/dtos/student.dto';
import { STUDENT_CREATE } from '../shared/queries/createStudent.query';
import { STUDENT_UPDATE } from '../shared/queries/updateStudent.query';
import { STUDENT_REMOVE } from '../shared/queries/removeStudent.query';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private readonly apollo: Apollo) {}

  getAllStudents(): Observable<ApolloQueryResult<any>> {
    return this.apollo
      .query({
        query: GET_ALL_STUDENTS,
      })
      .pipe(map((res: any) => res));
  }

  getStudent(studentId: string): Observable<ApolloQueryResult<any>> {
    return this.apollo
      .query({
        query: GET_STUDENT,
        variables: {
          studentId,
        },
      })
      .pipe(map((res: any) => res));
  }

  createStudent(data: StudentDto): Observable<ApolloQueryResult<any>> {
    return this.apollo
      .mutate({
        mutation: STUDENT_CREATE,
        variables: {
          data,
        },
      })
      .pipe(map((res: any) => res));
  }

  updateStudent(studentId: string | undefined, data: StudentDto): Observable<ApolloQueryResult<any>> {
    return this.apollo
      .mutate({
        mutation: STUDENT_UPDATE,
        variables: {
          studentId,
          data,
        },
      })
      .pipe(map((res: any) => res));
  }

  deleteStudent(studentId: string | undefined): Observable<ApolloQueryResult<any>> {
    return this.apollo
      .mutate({
        mutation: STUDENT_REMOVE,
        variables: {
          studentId,
        },
      })
      .pipe(map((res: any) => res));
  }
}
