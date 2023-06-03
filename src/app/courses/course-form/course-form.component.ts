import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

import {CoursesService} from "../service/courses.service";

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private service: CoursesService,
              private snackBar: MatSnackBar) {
    this.form = this.formBuilder.group({
      name: [null],
      category: [null]
    });
  }

  onSubmit(){
    this.service.save(this.form.value)
      .subscribe(result => console.log(result),
        error => this.onError());
  }

  onCancel(){

  }

  private onError() {
    this.snackBar.open('Erro ao salvar curso', '', {duration: 5000});
  }
}
