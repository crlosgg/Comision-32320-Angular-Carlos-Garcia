import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { StudentsList } from 'src/app/models/students';
import { ConfirmationModalComponent } from '../modals/confirmation-modal/confirmation-modal.component';
import { StudentModalComponent } from '../modals/student-modal/student-modal.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  initialData = StudentsList;
  
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'firstName', 'email', 'createdAt', 'action'];
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataSource.data = this.initialData;
  }


  openStudentModal() {
    let dialog = this.dialog.open(StudentModalComponent, {
      data: {
        action: 1
      }
    });

    dialog.afterClosed().subscribe(res => {
      if (res != undefined && res != null && res != '') {
        this.initialData.push(
          {
            ...res,
            id: this.initialData.length + 1,
            createdAt: new Date(),
            updatedAt: new Date(),
            score: 0,
          }
        )
        this.dataSource.data = this.initialData;
      }
     

    })
  }

  deleteStudent(id: number){
    let dialog = this.dialog.open(ConfirmationModalComponent, {
    });

    dialog.afterClosed().subscribe(res => {
      if (res == true) {
        let position = this.initialData.findIndex(item => item.id == id);
        this.initialData.splice(position, 1);
        this.dataSource.data = this.initialData;
      }
     

    })

  }

  openEditStudentModal(id: number) {
    let position = this.initialData.findIndex(item => item.id == id);
    let currentStudent = this.initialData.find(item => item.id == id);
    console.log(currentStudent)
    let dialog = this.dialog.open(StudentModalComponent, {
      data: {
        action: 2,
        user: currentStudent
      }
    });

    dialog.afterClosed().subscribe(res => {
      if (res != undefined && res != null && res != '') {
        this.initialData[position] = 
          {
            ...this.initialData[position],
            firstName: res.firstName,
            lastName: res.lastName,
            contactPhone: res.contactPhone,
            email: res.email,
            age: res.age,
            country: res.country
          };
        
        this.dataSource.data = this.initialData;
      }
     

    })
  }
}
