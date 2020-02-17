import { Observable } from 'rxjs';

export enum AlertLevel {
    danger = 1,
    warning = 2,
    info = 3,
    success = 4
};

export enum AlertType {
    App = 1,
    Notification = 2
}

export class AlertAction {
    Text: string;
    Action: Observable<any>
}

export default class Alert {
    Message: string;
    Icon: string;
    Level: AlertLevel
    Action: AlertAction;
    Watched = false;
    Type: AlertType

    constructor(msg: string) { this.Message = msg; }
}
