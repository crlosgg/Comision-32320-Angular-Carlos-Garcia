import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { CourseClass } from 'src/app/models/course-class';
import { ClassesService } from '../platform/classes/services/classes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  subscription!: Subscription;


  // Material Table properties
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'name', 'course', 'createdAt', 'updatedAt'];
  constructor(private dialog: MatDialog, private classService: ClassesService) { }

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


}
