import { Component, OnInit } from '@angular/core';
import {Message} from '../model/message';
import {MessageService} from '../service/message.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-message',
  templateUrl: './list-message.component.html',
  styleUrls: ['./list-message.component.css']
})
export class ListMessageComponent implements OnInit {

  messages: Message[] | undefined;
  // @ts-ignore
  message: 0;
  constructor(private messageService: MessageService,
              private router: Router) { }

  ngOnInit(): void {
    this.getMessages();
  }

  private getMessages() {
    this.messageService.getMessageList().subscribe(data => {
      // @ts-ignore
      this.message += this.messages?.length;

      this.messages = data;
    });
  }

}
