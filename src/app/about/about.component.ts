import { Component, OnInit } from '@angular/core';
import {AccountService} from '../service/account.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, ParamMap} from '@angular/router';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  // @ts-ignore
  updateForm: FormGroup;
  id: any;
  // @ts-ignore
  accout: Account;
  constructor(private userService: AccountService,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.formInfo();
  }
  formInfo(): void{
    this.updateForm = this.fb.group({
      userName: [''],
      email: [''],
      password: ['']
    });
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
      this.userService.getAccount(this.id).subscribe((result) => {
        // @ts-ignore
        this.accout = result;
        this.updateForm.patchValue(this.accout);
      });
    });
  }
  updateUser() {
    if (this.updateForm.valid) {
      const {value} = this.updateForm;
      const data = {
        ...this.accout,
        ...value
      };
      this.userService.updateAccount(data).subscribe(result => {
          alert('Update successfully!');
        }, error => {
          console.log(error);
        }
      );
    }
  }
}
