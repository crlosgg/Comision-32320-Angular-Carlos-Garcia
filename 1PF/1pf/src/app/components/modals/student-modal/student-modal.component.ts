
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-student-modal',
  templateUrl: './student-modal.component.html',
  styleUrls: ['./student-modal.component.css']
})
export class StudentModalComponent implements OnInit {


  userForm: FormGroup;
  loading: boolean = false;
  modalTitle!: string;
  modalSubmitButtonText!: string;

  constructor(public dialogRef: MatDialogRef<StudentModalComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.userForm = this.fb.group({
      firstName: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(2)]),
      contactPhone: new FormControl({ value: '', disabled: false }, [Validators.pattern('[- +()0-9]{6,}')]),
      email: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      age: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.min(12)]),
      country: new FormControl({ value: '', disabled: false })
    });


    let currentUserData = this.data.user;

    switch (this.data.action) {
      case 1:
        this.modalTitle = 'Add Student';
        this.modalSubmitButtonText = 'Add';
        break;
      case 2:
        this.modalTitle = 'Edit Student';
        this.userForm.setValue({
          firstName: currentUserData.firstName,
          lastName: currentUserData.lastName,
          contactPhone: currentUserData.contactPhone,
          email: currentUserData.email,
          age: currentUserData.age,
          country: currentUserData.country
       });
        this.userForm.addControl('id', new FormControl({ value: currentUserData.id, disabled: false }, [Validators.required]));
        this.userForm.addControl('createdAt', new FormControl({ value: currentUserData.createdAt, disabled: false }, [Validators.required]));
        this.userForm.addControl('updatedAt', new FormControl({ value: currentUserData.updatedAt, disabled: false }, [Validators.required]));
        this.userForm.addControl('score', new FormControl({ value: currentUserData.score, disabled: false }, [Validators.required]));
        this.modalSubmitButtonText = 'Save changes';
        break;
      default:
        this.modalTitle = 'Student';
        this.modalSubmitButtonText = 'Confirm';
        break;
    }

  }

  ngOnInit(): void {
  }
  save() {
    this.dialogRef.close(this.userForm.value)
  }

}
