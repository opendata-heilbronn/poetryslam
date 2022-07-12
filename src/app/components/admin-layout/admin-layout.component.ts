import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  dropDownOpen = false;
  openModal = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  toggle_header_settings($event: any) {
  }

  openPresentation() {
    this.router.navigate([]).then(result => { window.open(`/presentation`, '_blank'); });
  }

  closeSlamware() {
    window.close();
  }

}
