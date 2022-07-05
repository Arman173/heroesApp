import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styles: [
    `
      h1 {
        margin-bottom: 10px;
      }
      .container {
        height: 100%
      }
    `
  ]
})
export class ConfirmComponent implements OnInit {

  constructor(
    private _dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Heroe
  ) { }

  ngOnInit(): void {
  }

  erase() {
    this._dialogRef.close(true);
  }

  close() {
    this._dialogRef.close();
  }

}
