import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from '../../models/user';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup;
  returnUrl: string;
  submitted = false;
  error = '';
  currentUser: User;
  constructor ( private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService) {
              // redirect to home if already logged in
              if (this.authenticationService.currentUserValue) {
                this.router.navigate(['corps']);
            }
    }
    
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        username: ['', [Validators.required]],
        password: ['', Validators.required]
    });
}

  register() {
    this.router.navigate(['register']);
   }

  login() {
    this.authenticationService.login(this.username.value, this.password.value)
    .pipe(first())
    .subscribe(
         data => {
           
           if (this.authenticationService.currentUserValue['role'] === 'user')
            { this.router.navigate(["client/fiche"]); }
            else this.router.navigate(["corps"]); 
            
                           
        },
        error => {
            this.error = error;
        });
   }
   get username(): AbstractControl {
    return this.loginForm.get('username');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }
 }
