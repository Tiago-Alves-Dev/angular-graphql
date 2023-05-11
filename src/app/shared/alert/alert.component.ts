import { Component } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'alert',
  template: '',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private alertService: AlertService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.alertService.getMessage().subscribe((message) => {
      if (message) {
        if (message.type === 'success') {
          this._snackBar.open(message.text || 'Sucesso', 'Fechar', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 2000,
            panelClass: ['sucess-snackbar'],
          });
        } else if (message.type === 'error') {
          this._snackBar.open(message.text || 'Error!', 'Fechar', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 2000,
            panelClass: ['error-snackbar'],
          });
        } else if (message.type === 'warning') {
          this._snackBar.open(message.text || 'Atenção!', 'Fechar', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 2000,
            panelClass: ['warning-snackbar'],
          });
        } else {
          // this._snackBar.open('error', 'Fechar', {
          //   horizontalPosition: this.horizontalPosition,
          //   verticalPosition: this.verticalPosition,
          //   duration: 2000,
          //   panelClass: ['error-snackbar'],
          // });
        }
      }
    });
  }
}
