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
    const access_token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTSyI6IlVTRVIjMDAzIiwibmFtZSI6ImFuZHJlcyIsInJvbCI6IlJPTCNQTEFORUFET1IiLCJpYXQiOjE2OTkzMzEyOTd9.Tvji69j7PA283YisUDvPmVVzLiM9aKRi_PEdQ1wyFSU";

    return new HttpHeaders({
      "Content-Type": "application/json",
      authorizationToken: access_token,
    });
  }

  public getRFIDList(): any {
    const headers = this.createHeaders();

    const body = {
      operation: "get",
      filter: "PET#",
    };

    return this.client.post(`${this.URL}/lambda_function`, body, { headers });
  }
}
