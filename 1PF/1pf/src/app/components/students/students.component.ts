import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
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

  // SnackBar properties
  initialData = StudentsList;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 2;

  // Material Table properties
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'firstName', 'email', 'createdAt', 'updatedAt', 'action'];
  constructor(private dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.dataSource.data = this.initialData;
  }

  openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  openAddStudentModal() {
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
            score: 0,
          }
        )
        this.dataSource.data = this.initialData;
        this.openSnackBar('Student added successfully! 👍');
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
        this.openSnackBar('Student deleted successfully! 👍');
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
            country: res.country,
            updatedAt: new Date(),
          };
        
        this.dataSource.data = this.initialData;
        this.openSnackBar('Student updated successfully! 👍');
      }
     

    })
  }
}
