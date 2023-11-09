import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "environments/environment";

@Injectable({
  providedIn: "root",
})
export class WebSocketService {
  private socket: WebSocket;
  env: any = environment;
  private URL = this.env.WEB_SOCKET;

  constructor() {
    this.socket = new WebSocket(this.URL);
  }

  public connect(): Observable<any> {
    return new Observable((observer) => {
      this.socket.onmessage = (event) => observer.next(event.data);
      this.socket.onerror = (event) => observer.error(event);
      this.socket.onclose = () => observer.complete();
    });
  }

  public sendMessage(message: string): void {
    this.socket.send(message);
  }
}
