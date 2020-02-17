import { Injectable } from '@angular/core';
import Alert from '../models/alert';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  AppAlert: BehaviorSubject<Alert> = new BehaviorSubject<Alert>(null);

  constructor() { }

  sendAppAlert(item: Alert) {
    this.AppAlert.next(item);
  }

  updateAlert() {
    
  }

}
