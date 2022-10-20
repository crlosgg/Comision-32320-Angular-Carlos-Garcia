import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators'
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  subscription!: Subscription;

  // Material Table properties
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'firstName', 'email', 'createdAt', 'updatedAt', 'action'];

  constructor(private userService: UserService){
  }

  ngOnInit(): void {

    // 1. Observable from service consumed
    this.subscription = this.userService.studentsList$
    // 3. Map filter applied
    .pipe(map((data : User[]) => { return data.filter(x => x.age >= 18) ?? []; }))
    .subscribe({
      next: (students: User[]) => {
        this.dataSource.data = students;
      },
      error: (error: any) => {
        console.error(error);
      }
    });

    // 1. Promise from service consumed
    this.userService.getStudents()
      .then((value) => {
        console.log('Promise result as console table:');
        console.table(value);
      })
      .catch((error) => { console.error(error); })
      .finally(() => {console.log("The promise is completed")});
  }

  ngOnDestroy(): void {
    // 2. Unsubscription of observable from destroy function
    this.subscription.unsubscribe();
 }




}
