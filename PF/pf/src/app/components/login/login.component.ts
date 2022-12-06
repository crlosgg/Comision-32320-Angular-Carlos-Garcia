import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(
    private sessionService: SessionService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('carlos.garcia'),
      password: new FormControl('qwerty.09876$.12345'),
      admin: new FormControl(true)
    })
  }

  ngOnInit(): void {
  }

  login(){
    this.sessionService.login(this.loginForm.value.username, this.loginForm.value.password, this.loginForm.value.admin);
    this.router.navigate(['inicio']);
  }

}
