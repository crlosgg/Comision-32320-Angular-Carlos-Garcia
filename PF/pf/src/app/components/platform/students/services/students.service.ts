import { User } from "src/app/models/user";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StudentsService {

    studentsList: User[] = [
        {
            id: 1,
            firstName: 'Carlos',
            lastName: 'Garcia',
            contactPhone: '+528641009590',
            email: 'carlos@gmail.com',
            age: 16,
            country: 'MEXICO',
            createdAt: new Date(2022, 8, 10),
            score: 95,
        },
        {
            id: 2,
            firstName: 'Raul',
            lastName: 'Perez',
            contactPhone: '+528641009590',
            email: 'raul@gmail.com',
            age: 25,
            country: 'MEXICO',
            createdAt: new Date(2022, 8, 10),
            score: 95,
        },
        {
            id: 3,
            firstName: 'Ricardo',
            lastName: 'Sanchez',
            contactPhone: '+528641009590',
            email: 'ricardo@gmail.com',
            age: 25,
            country: 'MEXICO',
            createdAt: new Date(2022, 8, 10),
            score: 95,
        }]

    studentsSubject: BehaviorSubject<User[]>;

    constructor() {
        this.studentsSubject = new BehaviorSubject<User[]>(this.studentsList);
    }

    getStudents() {
        return this.studentsSubject.asObservable();
    }
    getStudentById(id: number) {
        return this.studentsSubject.value.find(s => s.id == id);
    }
    addStudent(student: User) {
        this.studentsList.push(student);
        this.studentsSubject.next(this.studentsList);
    }
    updateStudent(id: number, student: any) {
        let position = this.studentsList.findIndex(item => item.id == id);
        this.studentsList[position] = {
            ...this.studentsList[position],
            firstName: student.firstName,
            lastName: student.lastName,
            contactPhone: student.contactPhone,
            email: student.email,
            age: student.age,
            country: student.country,
            updatedAt: new Date(),
        };
        this.studentsSubject.next(this.studentsList);
    }
    deleteStudent(id: number){
        let position = this.studentsList.findIndex(item => item.id == id);
        this.studentsList.splice(position, 1);
        this.studentsSubject.next(this.studentsList);
    }
}