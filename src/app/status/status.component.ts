import {Component, Input, OnInit} from '@angular/core';
import {AccountService} from '../service/account.service';
import {TokenStorageService} from '../service/token-storage.service';
import {StatusService} from '../service/status.service';
import {IStatus} from '../model/istatus';
@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  listStatus: IStatus[] = [];



  constructor(private accountService: AccountService,
              private token: TokenStorageService,
              private statusService: StatusService,
              ) {
  }

  ngOnInit(): void {


  }
  getAll(): void{
    this.statusService.getOneStatus(1).subscribe((result) => {
      // this.listStatus = result;
    }, error => {

    });
  }



}
