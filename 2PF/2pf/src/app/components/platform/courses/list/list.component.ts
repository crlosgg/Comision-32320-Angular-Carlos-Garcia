import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/models/course';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { ModalComponent } from '../modal/modal.component';
import { CoursesService } from '../services/courses.service';

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
  displayedColumns: string[] = ['id', 'name', 'category', 'createdAt', 'updatedAt', 'action'];
  constructor(private dialog: MatDialog, private _snackBar: MatSnackBar, private courseService: CoursesService) { }

  ngOnInit(): void {
    this.subscription = this.courseService.getCourses()
      .subscribe({
        next: (courses: Course[]) => {
          this.dataSource.data = courses;
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

  openAddCourseModal() {
    let dialog = this.dialog.open(ModalComponent, {
      data: {
        action: 1
      }
    });

    dialog.afterClosed().subscribe(res => {
      if (res != undefined && res != null && res != '') {
        this.courseService.addCourse(
          {
            ...res,
            id: Math.floor(Math.random() * 100),
            createdAt: new Date(),
            score: 0,
          }
        )
        this.openSnackBar('Course added successfully! ????');
      }


    })
  }

  deleteCourse(id: number) {
    let dialog = this.dialog.open(ConfirmationModalComponent, {
    });

    dialog.afterClosed().subscribe(res => {
      if (res == true) {
        this.courseService.deleteCourse(id);
        this.openSnackBar('Course deleted successfully! ????');
      }
    })

  }

  openEditCourseModal(id: number) {
    let currentCourse = this.courseService.getCourseById(id);
    console.log(currentCourse)
    let dialog = this.dialog.open(ModalComponent, {
      data: {
        action: 2,
        user: currentCourse
      }
    });

    dialog.afterClosed().subscribe(res => {
      if (res != undefined && res != null && res != '') {
        this.courseService.updateCourse(id,
          {
            name: res.name,
            category: res.category,
            updatedAt: new Date(),
          });

        this.openSnackBar('Course updated successfully! ????');
      }


    })
  }

}
