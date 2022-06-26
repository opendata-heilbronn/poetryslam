import { Component, OnInit } from '@angular/core';
import { Eventdata } from 'src/app/models/eventdata';

@Component({
  selector: 'app-admin-presentation',
  templateUrl: './admin-presentation.component.html',
  styleUrls: ['./admin-presentation.component.scss']
})
export class AdminPresentationComponent implements OnInit {

  data: Eventdata | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
