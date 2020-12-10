import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../shared/backend.service';
import { Data } from '../../shared/data';

@Component({
  selector: 'bvg-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  all: Data[];

  constructor(private cs: BackendService) { }

  ngOnInit(): void {
    this.readAll();
  }

  readAll(): void {
    this.cs.getAll().subscribe(
      (response: Data[]) => { console.log(response);
        return this.all = response;  },
      error => console.log(error)
    );
  }
}
