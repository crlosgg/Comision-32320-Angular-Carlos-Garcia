import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'Programacion Reactiva';
  // subscription: any;
  // students!: User[];  
  
  // constructor(private userService: UserService){

  //   this.subscription = userService.studentsList$
  //   .pipe(map((data : User[]) => { return data.filter(x => x.age > 18) ?? []; }))
  //   .subscribe({
  //     next: (students: User[]) => {
  //       this.students = students;
  //       console.log('Observable result: ' + students)
  //     },
  //     error: (error: any) => {
  //       console.error(error);
  //     }
  //   });

  //   userService.getStudents().then((value) => {

  //     console.log('Promise result: ' + value)
      
  //     });
  // }


  // ngOnDestroy(): void {
  //    this.subscription.unsubscribe();
  // }


}
