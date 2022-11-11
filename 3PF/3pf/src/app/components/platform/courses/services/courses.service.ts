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
      catchError(this.manejarError)
    )
  }

  getCourseById(id: number): Observable<Course>{
    return this.http.get<Course>(`${environment.apiURL}/courses/${id}`, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'encoding': 'UTF-8'
      })
    }).pipe(
      catchError(this.manejarError)
    )
  }

  addCourse(Course: Course){
    this.http.post(`${environment.apiURL}/courses/`, Course, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'encoding': 'UTF-8'
      })
    }).pipe(
      catchError(this.manejarError)
    ).subscribe(console.log);
  }

  updateCourse(Course: Course){
    this.http.put<Course>(`${environment.apiURL}/courses/${Course.id}`, Course).pipe(
      catchError(this.manejarError)
    ).subscribe(console.log);
  }

  deleteCourse(id: number){
    this.http.delete<Course>(`${environment.apiURL}/courses/${id}`).pipe(
      catchError(this.manejarError)
    ).subscribe(console.log);  
  }

  private manejarError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.warn('Error del lado del cliente', error.error.message);
    }else{
      console.warn('Error del lado del servidor', error.error.message);
    }

    return throwError(() => new Error('Error en la comunicacion HTTP'));
  }
  
}
