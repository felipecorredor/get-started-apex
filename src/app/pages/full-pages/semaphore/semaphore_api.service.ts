import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";

@Injectable({
  providedIn: "root",
})
export class SemaphoreApiService {
  env: any = environment;
  URL = this.env.AWS_API;
  constructor(private client: HttpClient) {}

  private getAccessToken(): string {
    return localStorage.getItem("access_token") || "";
  }

  private createHeaders(): HttpHeaders {
    const access_token = this.getAccessToken();

    console.log("access_token::", access_token);

    return new HttpHeaders({
      "Content-Type": "application/json",
      authorizationToken: access_token,
    });
  }

  public getRFIDList(): any {
    const headers = this.createHeaders();

    const body = {
      operation: "get",
      filter: "RFID#",
    };

    return this.client.post(`${this.URL}/lambda_function`, body, { headers });
  }
}
