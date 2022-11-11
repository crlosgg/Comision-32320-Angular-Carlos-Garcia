import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  courseForm: FormGroup;
  loading: boolean = false;
  modalTitle!: string;
  modalSubmitButtonText!: string;

  constructor(public dialogRef: MatDialogRef<ModalComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.courseForm = this.fb.group({
      name: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(2)]),
      category: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(2)])
    });


    let currentUserData = this.data.user;

    switch (this.data.action) {
      case 1:
        this.modalTitle = 'Add Course';
        this.modalSubmitButtonText = 'Add';
        break;
      case 2:
        this.modalTitle = 'Edit Course';
        this.courseForm.setValue({
          name: currentUserData.name,
          category: currentUserData.category,
       });
        this.courseForm.addControl('id', new FormControl({ value: currentUserData.id, disabled: false }, [Validators.required]));
        this.courseForm.addControl('createdAt', new FormControl({ value: currentUserData.createdAt, disabled: false }, [Validators.required]));
        this.courseForm.addControl('updatedAt', new FormControl({ value: currentUserData.updatedAt, disabled: false }, []));
        this.modalSubmitButtonText = 'Save changes';
        break;
      default:
        this.modalTitle = 'Course';
        this.modalSubmitButtonText = 'Confirm';
        break;
    }

  }

  ngOnInit(): void {
  }
  save() {
    this.dialogRef.close(this.courseForm.value)
  }

}
