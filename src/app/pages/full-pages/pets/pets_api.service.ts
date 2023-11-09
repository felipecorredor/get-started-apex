import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";

@Injectable({
  providedIn: "root",
})
export class PetsApiService {
  env: any = environment;
  URL = this.env.URL_PETS;
  constructor(private client: HttpClient) {}

  // public getPets(): any {
  //   return this.client.get(`${this.URL}/pets`);
  // }
  public getPets(): any {
    return this.client.get(`${this.URL}/pets`);
  }
}
