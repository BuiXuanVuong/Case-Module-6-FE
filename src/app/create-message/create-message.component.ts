import { Component, OnInit } from '@angular/core';
import {Message} from '../model/message';
import {MessageService} from '../service/message.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Iuser} from '../model/iuser';
import {AuthService} from '../auth.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.css']
})
export class CreateMessageComponent implements OnInit {
  // @ts-ignore
  public userLogin: Iuser;
  // @ts-ignore
  public userPath: Iuser;

  public messageForm = new FormGroup({
    message_body: new FormControl('')
  });

  constructor(private messageService: MessageService,
              private router: Router,
              private auth: AuthService,
              private route: ActivatedRoute,
              private fb: FormBuilder) {
    this.route.paramMap.subscribe((paraMap: ParamMap) => {
      // @ts-ignore
      // this.userPath = paraMap.get('userName');
      this.userPath = paraMap.get('userPath');
      console.log(this.userPath);
    });
    // @ts-ignore
    this.userLogin = auth.currentUserValue.userName;
  }

  ngOnInit(): void {

  }

  public saveMessage() {
    // @ts-ignore
    this.messageService.createMessage(this.userLogin, this.userPath, this.createNewMessage()).subscribe((data) => {
      alert('Đã gửi tin nhắn đến' + this.userPath);
      this.messageForm.reset();
    });
  }

  private createNewMessage() {
    const newMessage = {};
    for (const controlName in this.messageForm.controls) {
      if (controlName) {
        // @ts-ignore
        newMessage[controlName] = this.messageForm.controls[controlName].value;
      }
    }
    return newMessage as Message;
  }

  private back() {
    this.router.navigate(['timeline', this.auth.currentUserValue.userName]);
  }

}
