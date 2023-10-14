import { Component, OnInit, QueryList, ViewChildren } from "@angular/core";

import { Observable } from "rxjs";
import { NgbdSortableHeader, SortEvent } from "./sortable.directive";
import { PetService } from "./pet.service";
import { DecimalPipe } from "@angular/common";

@Component({
  selector: "app-pets",
  templateUrl: "./pets.component.html",
  providers: [PetService, DecimalPipe],
})
export class PetsComponent implements OnInit {
  pets$: Observable<any[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public service: PetService) {
    this.pets$ = service.pets$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {}

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = "";
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}
