import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmationModalComponent>) { }

  ngOnInit(): void {
  }
  confirm() {
    this.dialogRef.close(true)
  }
}
