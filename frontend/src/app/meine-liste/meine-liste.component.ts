import { Component, OnInit } from '@angular/core';
import {BackendService} from "../shared/backend.service";
import {AuthService} from "../services/auth.service";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Busdata} from "../shared/busdaten";

@Component({
  selector: 'bvg-meine-liste',
  templateUrl: './meine-liste.component.html',
  styleUrls: ['./meine-liste.component.css']
})
export class MeineListeComponent implements OnInit {

  busdaten: Busdata[];
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

  trackByData(index: number, data: Busdata): number { return data.id; }

  readBus(): void {
    this.cs.getAll().subscribe((response: Busdata[]) =>  {
        console.log(response);
        return this.busdaten = response;  },
      error => console.log(error)
      // );this.busdaten = response
    );
  }

}
