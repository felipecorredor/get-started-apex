import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";

@Injectable({
  providedIn: "root",
})
export class PetsService {
  env: any = environment;
  URL = this.env.urlBackend + this.env.urlPets;
  constructor(private client: HttpClient) {}

  public getPets(): any {
    return this.client.get(this.URL);
  }
}
