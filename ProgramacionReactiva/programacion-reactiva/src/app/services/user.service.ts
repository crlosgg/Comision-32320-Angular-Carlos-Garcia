import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

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

  studentsList$: Observable<User[]>;

  constructor() { 
    this.studentsList$ = new Observable<User[]>((data) => {
      data.next(this.studentsList);
    })

  }

  getStudents(): Promise<User[] | any>{
    return new Promise((resolve, reject) => {
      if(this.studentsList.length > 0){
        resolve(this.studentsList);
      }else{
        reject({
          code: 0,
          response: 'No data found'
        });
      }
    });
  }

}
