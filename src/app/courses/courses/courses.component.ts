import { Component } from '@angular/core';
import { Course } from "../model/course";
import { CoursesService } from "../service/courses.service";

import { Observable } from "rxjs";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  courses: Observable<Course[]>
  // courses: Course[] = [];
  displayedColumns = ['name', 'category'];

  constructor(private coursesService: CoursesService) {
    this.courses = this.coursesService.list();
    // this.coursesService.list().subscribe(courses => this.courses = courses);
  }
}
