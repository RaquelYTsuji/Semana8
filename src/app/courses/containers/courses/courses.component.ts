import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

import { Course } from "../../model/course";
import { CoursesService } from "../../service/courses.service";
import { ErrorDialogComponent } from "../../../shared/components/error-dialog/error-dialog.component";

import { catchError, Observable, of } from "rxjs";
import { ConfirmationDialogComponent } from "../../components/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent{
  courses$: Observable<Course[]> | null = null;

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  )
  {
    this.refresh();
  }

  refresh() {
    this.courses$ = this.coursesService.list()
      .pipe(
        catchError(error => {
          this.onError('Erro ao carregar cursos.');
          return of([])
        })
      );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onEdit(course: Course) {
    this.router.navigate(['edit', course._id], {relativeTo: this.route});
  }

  onRemove(course: Course) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse curso?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result){
        this.coursesService.remove(course._id).subscribe(
          () => {
            this.refresh();
            this.snackBar.open('Curso deletado com sucesso', 'x', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          error => this.onError('Erro ao tentar remover curso')
        );
      }
    });
  }
}
