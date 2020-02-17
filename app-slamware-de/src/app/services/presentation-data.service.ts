import { Injectable, ChangeDetectorRef } from '@angular/core';
import { ipcRenderer } from 'electron';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PresentationDataService {

  public data: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private ref: ChangeDetectorRef) {

    ipcRenderer.on('updateData', (event, arg) => {
      this.data.next(arg);
      this.ref.detectChanges();
    });
  }

}
