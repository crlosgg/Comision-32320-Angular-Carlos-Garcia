import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { ModalComponent } from '../modal/modal.component';
import { StudentsService } from '../services/students.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  subscription!: Subscription;

  // SnackBar properties
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 2;

  // Material Table properties
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'createdAt', 'updatedAt', 'action'];
  constructor(private dialog: MatDialog, private _snackBar: MatSnackBar, private userService: StudentsService) { }

  ngOnInit(): void {
    this.subscription = this.userService.getStudents()
      .subscribe({
        next: (students: User[]) => {
          this.dataSource.data = students;
        },
        error: (error: any) => {
          console.error(error);
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  openAddStudentModal() {
    let dialog = this.dialog.open(ModalComponent, {
      data: {
        action: 1
      }
    });

    dialog.afterClosed().subscribe(res => {
      if (res != undefined && res != null && res != '') {
        this.userService.addStudent(
          {
            ...res,
            id: Math.floor(Math.random() * 100),
            createdAt: new Date(),
            score: 0,
          }
        )
        this.openSnackBar('Student added successfully! 👍');
      }


    })
  }

  deleteStudent(id: number) {
    let dialog = this.dialog.open(ConfirmationModalComponent, {
    });

    dialog.afterClosed().subscribe(res => {
      if (res == true) {
        this.userService.deleteStudent(id);
        this.openSnackBar('Student deleted successfully! 👍');
      }
    })

  }

  openEditStudentModal(id: number) {
    let currentStudent = this.userService.getStudentById(id);
    console.log(currentStudent)
    let dialog = this.dialog.open(ModalComponent, {
      data: {
        action: 2,
        user: currentStudent
      }
    });

    dialog.afterClosed().subscribe(res => {
      if (res != undefined && res != null && res != '') {
        this.userService.updateStudent(id,
          {
            firstName: res.firstName,
            lastName: res.lastName,
            contactPhone: res.contactPhone,
            email: res.email,
            age: res.age,
            country: res.country,
            updatedAt: new Date(),
          });

        this.openSnackBar('Student updated successfully! 👍');
      }


    })
  }

}
