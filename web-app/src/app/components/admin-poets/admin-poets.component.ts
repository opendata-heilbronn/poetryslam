import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Poet } from 'src/app/models/poet';
import { MessageService } from 'src/app/services/message.service';
import { PoetService } from 'src/app/services/poet.service';

@Component({
  selector: 'app-admin-poets',
  templateUrl: './admin-poets.component.html',
  styleUrls: ['./admin-poets.component.scss']
})
export class AdminPoetsComponent implements OnInit {

  poets: Poet[] = []

  constructor(
    private poetService: PoetService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.poetService.poets.subscribe(p => this.poets = p);
  }

  openPoet(poet: Poet) {
    this.router.navigate(['/admin/poets/' + poet.id]);
  }

}
