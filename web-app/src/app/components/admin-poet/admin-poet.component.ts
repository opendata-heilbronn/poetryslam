import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Poet } from 'src/app/models/poet';
import { PoetService } from 'src/app/services/poet.service';

@Component({
  selector: 'app-admin-poet',
  templateUrl: './admin-poet.component.html',
  styleUrls: ['./admin-poet.component.scss']
})
export class AdminPoetComponent implements OnInit {

  poet: Poet | undefined;

  constructor(
    private route: ActivatedRoute,
    private poetService: PoetService
  ) { }

  ngOnInit(): void {
    const poet_id = this.route.snapshot.paramMap.get('id');

    if (poet_id) {
      if (poet_id == "new") {
        console.log("new poet")
        this.poet = new Poet();        
      } else {
        this.poet = this.poetService.getPoet(poet_id);
        console.log(this.poet);
      }
    }
  }

  onSubmit() {
    console.log(this.poet);
  }

}
