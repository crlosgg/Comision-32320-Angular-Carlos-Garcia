import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { Course } from 'src/app/models/course';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { ModalComponent } from '../modal/modal.component';
import { CoursesService } from '../services/courses.service';

import { selectStateCourses } from 'src/app/components/platform/courses/state/courses.selectors';
import { loadCourses, addCourse, editCourse, deleteCourse } from 'src/app/components/platform/courses/state/courses.actions';
import { CourseState } from 'src/app/models/course.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  subscriptionSingleObject!: Subscription;
  courses$!: Observable<Course[]>;
  // SnackBar properties
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 2;

  // Material Table properties
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'name', 'category', 'createdAt', 'updatedAt', 'action'];
  constructor(private dialog: MatDialog, private _snackBar: MatSnackBar, private courseService: CoursesService, private storeCourses: Store<CourseState>,) { 
    this.storeCourses.dispatch(loadCourses());
  }

  ngOnInit(): void {
    this.getCourses();
  }

  ngOnDestroy(): void {
    this.subscriptionSingleObject?.unsubscribe();
  }

  getCourses(){

    this.storeCourses.select(selectStateCourses).subscribe((courses: Course[]) => {
      this.dataSource.data = courses;
    });
    this.courses$ = this.storeCourses.select(selectStateCourses);
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
        let objCourse: Course = 
          {
            ...res,
            id: Math.floor(Math.random() * 100),
            createdAt: new Date()
          };
        
        this.storeCourses.dispatch(addCourse({course: objCourse}));
        this.openSnackBar('Course added successfully! 👍');
      }


    })
  }

  deleteCourse(id: number) {
    let dialog = this.dialog.open(ConfirmationModalComponent, {
    });

    dialog.afterClosed().subscribe(res => {
      if (res == true) {
        this.storeCourses.dispatch(deleteCourse({ id: id }));
        this.openSnackBar('Course deleted successfully! 👍');
      }
    })

  }

  currentCourse!: Course;
  openEditCourseModal(id: number) {
    this.subscriptionSingleObject = this.courseService.getCourseById(id)
      .subscribe({
        next: (course: Course) => {
          this.currentCourse = course;

          let dialog = this.dialog.open(ModalComponent, {
            data: {
              action: 2,
              user: this.currentCourse
            }
          });

          dialog.afterClosed().subscribe(res => {
            if (res != undefined && res != null && res != '') {
              let objCourse: Course = {
                id: this.currentCourse.id,
                name: res.name,
                category: res.category,
                updatedAt: new Date(),
                createdAt: this.currentCourse.createdAt
              }
              this.storeCourses.dispatch(editCourse({course: objCourse}));

              this.openSnackBar('Course updated successfully! 👍');
            }


          })
        },
        error: (error: any) => {
          console.error(error);
        }
      });


  }

}
