import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Course } from 'src/app/models/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  coursesList: Course[] = [
    {
        id: 1,
        name: 'Angular',
        category: 'Frontend',
        createdAt: new Date(2022, 8, 10),
    },
    {
        id: 2,
        name: 'C#',
        category: 'Backend',
        createdAt: new Date(2022, 8, 10),
    }]

coursesSubject: BehaviorSubject<Course[]>;

constructor() {
    this.coursesSubject = new BehaviorSubject<Course[]>(this.coursesList);
}

getCourses() {
    return this.coursesSubject.asObservable();
}
getCourseById(id: number) {
    return this.coursesSubject.value.find(s => s.id == id);
}
addCourse(course: Course) {
    this.coursesList.push(course);
    this.coursesSubject.next(this.coursesList);
}
updateCourse(id: number, course: any) {
    let position = this.coursesList.findIndex(item => item.id == id);
    this.coursesList[position] = {
        ...this.coursesList[position],
        name: course.name,
        category: course.category,
        updatedAt: new Date(),
    };
    this.coursesSubject.next(this.coursesList);
}
deleteCourse(id: number){
    let position = this.coursesList.findIndex(item => item.id == id);
    this.coursesList.splice(position, 1);
    this.coursesSubject.next(this.coursesList);
}
}
