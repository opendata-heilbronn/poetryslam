import { AfterViewInit, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService implements AfterViewInit {

  InComingMsg: Subject<Message> = new Subject();

  constructor() {
    window.addEventListener("storage", () => {
      console.log("change in ls detected");
    }, false);
  }

  ngAfterViewInit(): void {

    console.log("init msg service");
    addEventListener("storage", e => this.onStorage(e));
  }

  SendMessage(msg: Message) {

  }

  private onStorage(event: StorageEvent) {
    console.log("storage changed")
    console.log(event);
  }


}
