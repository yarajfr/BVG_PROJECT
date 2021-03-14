import { Component, OnInit } from '@angular/core';
import {Busdaten} from "../../shared/busdaten";
import {BackendService} from "../../shared/backend.service";
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'bvg-busdaten-read',
  templateUrl: './busdaten-read.component.html',
  styleUrls: ['./busdaten-read.component.css']
})
export class BusdatenReadComponent implements OnInit {

  busdaten: Busdaten[];
  selectedId: number;

  constructor(private cs: BackendService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.selectedId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.selectedId === 0) {
    this.readBus();
  }
      else {
  console.log('id = ' + this.selectedId);
}
}

  trackByData(index: number, data: Busdaten): number { return data.id; }

  readBus(): void {
    this.cs.getAll().subscribe((response: Busdaten[]) =>  {
        console.log(response);
        return this.busdaten = response;  },
      error => console.log(error)
    // );this.busdaten = response
    );
  }

}
