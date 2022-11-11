import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { CourseClass } from 'src/app/models/course-class';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { ModalComponent } from '../modal/modal.component';
import { ClassesService } from '../services/classes.service';

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
  displayedColumns: string[] = ['id', 'name', 'course', 'createdAt', 'updatedAt', 'action'];
  constructor(private dialog: MatDialog, private _snackBar: MatSnackBar, private classService: ClassesService) { }

  ngOnInit(): void {
    this.subscription = this.classService.getClasses()
      .subscribe({
        next: (classes: CourseClass[]) => {
          this.dataSource.data = classes;
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

  openAddClassModal() {
    let dialog = this.dialog.open(ModalComponent, {
      data: {
        action: 1
      }
    });

    dialog.afterClosed().subscribe(res => {
      if (res != undefined && res != null && res != '') {
        this.classService.addClass(
          {
            ...res,
            id: Math.floor(Math.random() * 100),
            createdAt: new Date(),
            score: 0,
          }
        )
        this.openSnackBar('Class added successfully! 👍');
      }


    })
  }

  deleteClass(id: number) {
    let dialog = this.dialog.open(ConfirmationModalComponent, {
    });

    dialog.afterClosed().subscribe(res => {
      if (res == true) {
        this.classService.deleteClass(id);
        this.openSnackBar('Class deleted successfully! 👍');
      }
    })

  }

  openEditClassModal(id: number) {
    let currentClass = this.classService.getClassById(id);
    console.log(currentClass)
    let dialog = this.dialog.open(ModalComponent, {
      data: {
        action: 2,
        user: currentClass
      }
    });

    dialog.afterClosed().subscribe(res => {
      if (res != undefined && res != null && res != '') {
        this.classService.updateClass(id,
          {
            name: res.name,
            course: res.course,
            updatedAt: new Date(),
          });

        this.openSnackBar('Class updated successfully! 👍');
      }


    })
  }


}
