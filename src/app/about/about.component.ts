import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {IAccount} from '../model/iaccount';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {AccountService} from '../service/account.service';

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
  account: IAccount;

  constructor(private accountService: AccountService,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.updateForm = this.fb.group({
      userName: [''],
      email: [''],
      birthday: [''],
      phone: [''],
    });
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');

      this.accountService.getAccount(2).subscribe((result) => {
        this.account = result;
        this.updateForm.patchValue(this.account);
      });
    });
  }

  updateUser() {
    if (this.updateForm.valid) {
      const {value} = this.updateForm;
      const data = {
        ...this.account,
        ...value
      };
      this.accountService.updateAccount(data).subscribe(result => {
          alert('Update successfully!');
        }, error => {
          console.log(error);
        }
      );
    }
  }
}
