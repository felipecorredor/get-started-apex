import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase/app";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "environments/environment.prod";

@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  env: any = environment;
  private URL = this.env.AWS_API;

  constructor(
    public _firebaseAuth: AngularFireAuth,
    public router: Router,
    private readonly http: HttpClient
  ) {
    this.user = _firebaseAuth.authState;
    this.user.subscribe((user) => {
      if (user) {
        this.userDetails = user;
      } else {
        this.userDetails = null;
      }
    });
  }

  signupUser(email: string, password: string) {
    //your code for signing up the new user
  }

  signinUser(user: string, password: string) {
    const body = { user, password };
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http.post(`${this.URL}/authentication`, body, {
      headers,
    });

    //uncomment above firebase auth code and remove this temp code
    // return new Promise(function (resolve, reject) {
    //   setTimeout(function () {
    //     resolve(true);
    //   }, 1000);
    // });
  }

  logout() {
    this._firebaseAuth.signOut();
    this.router.navigate(["YOUR_LOGOUT_URL"]);
  }

  isAuthenticated() {
    return true;
  }
}
