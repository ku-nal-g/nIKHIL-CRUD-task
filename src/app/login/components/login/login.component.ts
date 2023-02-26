import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/common/services/global.service';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup!: FormGroup;
  getAllUsers: any = [];
  usersInfo: any;
  formSubmitAttemp: boolean = false;

  toggleIcon: boolean = true;

  constructor(private _fb: FormBuilder, private _login: LoginService, private _globalservice: GlobalService, private router: Router) { }

  ngOnInit(): void {
    this.createFormGroup();
    let token = this._globalservice.getStoreValue("authtoken");
    if (token) {
      this.router.navigate(['/admin']);
    }
  }
  changeIcon() {
    this.toggleIcon = !this.toggleIcon;
  }
  createFormGroup() {
    this.loginFormGroup = this._fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }
  getInput() {
    return !this.toggleIcon ? 'text' : 'password';
  }
  login() {
    this.formSubmitAttemp = true;
    if (this.loginFormGroup.valid) {
      this._login.getRegisteredUsers().subscribe(({
        next: (res) => {
          this._globalservice.showLoader();
          setTimeout(() => {
            this.getAllUsers = res;
            console.log(this.getAllUsers);
            if (this.authenticateUser()) {
              this._globalservice.setStoreValue("user_info", this.usersInfo);
              this._globalservice.setStoreValue("authtoken", "qwertyuiop");
              this.router.navigateByUrl('/admin');
              this._globalservice.showSuccessToastr("Logged in Successfully!!!,Success")
            }
            else {
              this._globalservice.showErrorToastr("No Records Found", "Error");
              this.loginFormGroup.reset();
            }
            this._globalservice.hideLoader();
          }, 4000)
        },
        error: (err) => {
          this._globalservice.hideLoader();
          this._globalservice.showErrorToastr("Somethng went wrong", "Error");
        }
      }))
    }
  }
  authenticateUser() {
    let isFound: boolean = false;
    for (let data of this.getAllUsers) {
      if (data.email === this.loginFormGroup.value.email && data.password === this.loginFormGroup.value.password) {
        this.usersInfo = data;
        return true;
      }
    }
    return isFound;
  }
  getRequiredError(controlName: string) {
    if ((this.loginFormGroup.controls[controlName].touched && this.loginFormGroup.controls[controlName].invalid) || (this.formSubmitAttemp && this.loginFormGroup.controls[controlName].invalid)) {
      return true;
    }
    return false;
  }
}
