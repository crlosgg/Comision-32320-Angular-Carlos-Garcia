import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  usersList: Array<User> = [
    { id: 1, firstName: 'Carlos', lastName: 'Garcia', contactPhone: '+52 811 123 4567', email: 'carlos@garcia.com', age: 25, country: 'Mexico', createdAt: new Date(2017, 7, 2), updatedAt: new Date(2022, 8, 26), score: 98},
    { id: 2, firstName: 'Raul', lastName: 'Perez', contactPhone: '+52 811 123 4567', email: 'raul@perez.com', age: 21, country: 'Argentina', createdAt: new Date(2022, 0, 5), updatedAt: new Date(2022, 8, 26), score: 99},
    { id: 3, firstName: 'Cesar', lastName: 'Ramos', contactPhone: '+52 811 123 4567', email: 'cesar@ramos.com', age: 18, country: 'Mexico', createdAt: new Date(2021, 8, 12), updatedAt: new Date(2022, 8, 26), score: 66},
    { id: 4, firstName: 'Carmen', lastName: 'Ayala', contactPhone: '+52 811 123 4567', email: 'carmen@ayala.com', age: 39, country: 'Chile', createdAt: new Date(2020, 1, 2), updatedAt: new Date(2022, 8, 26), score: 78},
    { id: 5, firstName: 'Ricardo', lastName: 'Mendez', contactPhone: '+52 811 123 4567', email: 'ricardo@mendez.com', age: 22, country: 'Mexico', createdAt: new Date(2019, 6, 22), updatedAt: new Date(2022, 8, 26), score: 100},
    { id: 6, firstName: 'Viviana', lastName: 'Garza', contactPhone: '+52 811 123 4567', email: 'vivian@garza.com', age: 17, country: 'Venezuela', createdAt: new Date(2019, 5, 30), updatedAt: new Date(2022, 8, 26), score: 92},
    { id: 7, firstName: 'Dana', lastName: 'Cantu', contactPhone: '+52 811 123 4567', email: 'dana@cantu.com', age: 45, country: 'Mexico', createdAt: new Date(2022, 4, 22), updatedAt: new Date(2022, 8, 26), score: 46},
    
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
