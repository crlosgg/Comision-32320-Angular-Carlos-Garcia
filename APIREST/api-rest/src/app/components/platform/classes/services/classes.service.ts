import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CourseClass } from 'src/app/models/course-class';

@Injectable({
    providedIn: 'root'
})
export class ClassesService {

    classesList: CourseClass[] = [
        {
            id: 1,
            name: 'Reactive Programming',
            course: 'Angular',
            createdAt: new Date(2022, 8, 10),
        },
        {
            id: 2,
            name: 'Threads',
            course: 'C#',
            createdAt: new Date(2022, 8, 10),
        }]

    classesSubject: BehaviorSubject<CourseClass[]>;

    constructor() {
        this.classesSubject = new BehaviorSubject<CourseClass[]>(this.classesList);
    }

    getClasses() {
        return this.classesSubject.asObservable();
    }
    getClassById(id: number) {
        return this.classesSubject.value.find(s => s.id == id);
    }
    addClass(course: CourseClass) {
        this.classesList.push(course);
        this.classesSubject.next(this.classesList);
    }
    updateClass(id: number, course: any) {
        let position = this.classesList.findIndex(item => item.id == id);
        this.classesList[position] = {
            ...this.classesList[position],
            name: course.name,
            course: course.course,
            updatedAt: new Date(),
        };
        this.classesSubject.next(this.classesList);
    }
    deleteClass(id: number){
        let position = this.classesList.findIndex(item => item.id == id);
        this.classesList.splice(position, 1);
        this.classesSubject.next(this.classesList);
    }
  
}
