import { Injectable } from "@angular/core";

import { BehaviorSubject, Observable, of, Subject } from "rxjs";

import { PETS } from "./pets";
import { DecimalPipe } from "@angular/common";
import { debounceTime, delay, switchMap, tap } from "rxjs/operators";
import { SortDirection } from "./sortable.directive";
import { Pet } from "./pet";

interface SearchResult {
  pets: Pet[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}

function compare(v1, v2) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(pets: Pet[], column: string, direction: string): Pet[] {
  if (direction === "") {
    return pets;
  } else {
    return [...pets].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === "asc" ? res : -res;
    });
  }
}

function matches(pet: Pet, term: string, pipe) {
  return (
    pet.name.toLowerCase().includes(term.toLowerCase()) ||
    pipe.transform(pet.age).includes(term)
  );
}

@Injectable({ providedIn: "root" })
export class PetService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _pets$ = new BehaviorSubject<Pet[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: "",
    sortColumn: "",
    sortDirection: "",
  };

  constructor(private pipe: DecimalPipe) {
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false))
      )
      .subscribe((result) => {
        this._pets$.next(result.pets);
        this._total$.next(result.total);
      });

    this._search$.next();
  }

  get pets$() {
    return this._pets$.asObservable();
  }
  get total$() {
    return this._total$.asObservable();
  }
  get loading$() {
    return this._loading$.asObservable();
  }
  get page() {
    return this._state.page;
  }
  get pageSize() {
    return this._state.pageSize;
  }
  get searchTerm() {
    return this._state.searchTerm;
  }

  set page(page: number) {
    this._set({ page });
  }
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }
  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }
  set sortColumn(sortColumn: string) {
    this._set({ sortColumn });
  }
  set sortDirection(sortDirection: SortDirection) {
    this._set({ sortDirection });
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } =
      this._state;

    // 1. sort
    let pets = sort(PETS, sortColumn, sortDirection);

    // 2. filter
    pets = pets.filter((country) => matches(country, searchTerm, this.pipe));
    const total = pets.length;

    // 3. paginate
    pets = pets.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ pets, total });
  }
}
