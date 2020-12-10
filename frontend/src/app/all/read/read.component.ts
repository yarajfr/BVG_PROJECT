import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../shared/backend.service';
import { Data } from '../../shared/data';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'bvg-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  all: Data[];
  selectedId: number;

  constructor(private cs: BackendService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.selectedId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.selectedId === 0) {
       this.readAll();
    }
    else {
      console.log('id = ' + this.selectedId);
    }
  }

trackByData(index: number, data: Data): number { return data.id; }

readAll(): void {
  this.cs.getAll().subscribe(
    (response: Data[]) => this.all = response,
    error => console.log(error)
  );
 }
}
