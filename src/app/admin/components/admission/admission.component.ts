import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/common/services/global.service';
import { UsersDataService } from './../../services/users-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.scss']
})
export class AdmissionComponent implements OnInit {

  studentsList: any = [];
  tableHeaders: any = [];
  deleteUserName!: string;
  deleteuserIndex!: number;
  showTable: boolean = true;
  updateUserIndex!: number;

  addStudentFormGroup!: FormGroup;

  constructor(private _userData: UsersDataService, private _globalservice: GlobalService, private _fb: FormBuilder) {
    this.createAddStudentFormGroup();
  }

  ngOnInit(): void {
    this._globalservice.showLoader();
    this._userData.getStudentsList().subscribe(({
      next: (res) => {
        setTimeout(() => {
          this.studentsList = res;
          this.tableHeaders = Object.keys(this.studentsList[0]);
          this.tableHeaders.push('Action');
          this._globalservice.hideLoader();
        }, 1000)
      },
      error: (err: Error) => {
        this._globalservice.hideLoader();
        this._globalservice.showErrorToastr("Something went wrong", "Error");
      }
    }))
  }
  getDeleteUserData(userName: string, id: number) {
    this.deleteUserName = userName;
    this.deleteuserIndex = id;
  }
  deleteUser() {
    this._userData.deleteStudent(this.deleteuserIndex).subscribe(({
      next: (res) => {
        setTimeout(() => {
          this._globalservice.showSuccessToastr("User deleted Successfully!!!", "Sucess");
          this.ngOnInit();
        })
      },
      error: (err: Error) => {
        this._globalservice.showErrorToastr("Something went wrong!!!", "Error");
      }
    }))

  }
  addNewStudent() {
    this.showTable = !this.showTable;
  }
  createAddStudentFormGroup() {
    this.addStudentFormGroup = this._fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      age: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]]
    })
  }
  registerNewStudent() {
    if (this.addStudentFormGroup.valid) {
      this._userData.postStudent(this.addStudentFormGroup.value).subscribe(({
        next: (res) => {
          setTimeout(() => {
            this._globalservice.showSuccessToastr("Student Added Sucessfully", "Success");
            this.showTable = !this.showTable;
            this.ngOnInit();
          }, 1000)
        },
        error: (err: Error) => {
          this._globalservice.showErrorToastr("Something went wrong!!!", "Error");
        }
      }))
    }
  }
  patchEditUserData(obj: any) {
    this.updateUserIndex = obj.id;
    this.addStudentFormGroup.patchValue(
      {
        'firstname': obj.firstname,
        'lastname': obj.lastname,
        'age': obj.age,
        'gender': obj.gender,
        'email': obj.email,
        'phone': obj.phone,
        'city': obj.city,
        'state': obj.state,
        'country': obj.country
      }
    )
  }
  updateStudentInfo() {
    if (this.addStudentFormGroup.valid) {
      this._userData.updateStudent(this.addStudentFormGroup.value, this.updateUserIndex).subscribe(({
        next: () => {
          this._globalservice.showSuccessToastr("Student Updated Successfully", "Success");
          this.ngOnInit();
        },
        error: (err: Error) => {
          this._globalservice.showErrorToastr("Something went wrong!!!", "Error");
        }
      }))
    }
  }
}
