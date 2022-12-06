import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, filter, map, Observable, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Course } from 'src/app/models/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

constructor(private http: HttpClient) {
    
  }

  getCourses(): Observable<Course[]>{
    return this.http.get<Course[]>(`${environment.apiURL}/courses`, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'encoding': 'UTF-8'
      })
    }).pipe(
      catchError(this.handleError)
    )
  }

  getCourseById(id: number): Observable<Course>{
    return this.http.get<Course>(`${environment.apiURL}/courses/${id}`, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'encoding': 'UTF-8'
      })
    }).pipe(
      catchError(this.handleError)
    )
  }

  addCourse(Course: Course): Observable<Course>{
    return this.http.post<Course>(`${environment.apiURL}/courses/`, Course, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'encoding': 'UTF-8'
      })
    })
  }

  updateCourse(Course: Course): Observable<Course>{
    return this.http.put<Course>(`${environment.apiURL}/courses/${Course.id}`, Course);
  }

  deleteCourse(id: number): Observable<Course>{
    return this.http.delete<Course>(`${environment.apiURL}/courses/${id}`);
  }

  private handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.warn('Error on client side', error.error.message);
    }else{
      console.warn('Error on server side', error.error.message);
    }

    return throwError(() => new Error('Error on HTTP communication'));
  }
  
}
