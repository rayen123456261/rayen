import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {
    registerForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService) { }
    // ------------
    ngOnInit(): void {
        this.registerForm = this.formBuilder.group({
          email: ['',
            [Validators.required]
          ],
          password: ['',
            [Validators.required]
          ],
          verifPassword: ['',
          [Validators.required]
         ],
          username: ['',
            [Validators.required]
        ],
        role: ['user']
        });
      }
    // -----------
    submit() {
        if (this.registerForm.valid) {
          let user: User = this.registerForm.value;
          console.log(user);
          this.userService.register(user).subscribe(
            data => {
              this.router.navigate(['/login']);
            },
            error => {
              console.log(error);
            }
          );
        }
      }

        //getters
  get email(): AbstractControl {
    return this.registerForm.get('email');
  }
  get password(): AbstractControl {
    return this.registerForm.get('password');
  }
  get usenrame(): AbstractControl {
    return this.registerForm.get('username');
  }
  get verifPassword(): AbstractControl {
    return this.registerForm.get('verifPassword');
  }

}
