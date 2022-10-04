import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateValidator } from 'src/app/validators/DateValidator';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      firstName: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(2)]),
      contactPhone: new FormControl({ value: '', disabled: false }, [Validators.pattern('[- +()0-9]{6,}')]),
      email: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      dateBirth: new FormControl({ value: '', disabled: false }, [Validators.required, DateValidator.minAge]),
      country: new FormControl({ value: '', disabled: false })
    });

  }

  ngOnInit(): void {
  }
  submitForm() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 3000)
  }

}
