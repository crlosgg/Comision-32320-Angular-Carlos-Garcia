import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Session } from '../models/session';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  sessionSubject!: BehaviorSubject<Session>;

  constructor() {
    const session: Session = {
      activeSession: false
    };
    this.sessionSubject = new BehaviorSubject(session);
  }

  login(username: string, password: string, admin: boolean){
    const session: Session = {
      activeSession: true,
      activeUser: {
        username: username,
        password: password,
        admin: admin
      }
    }

    this.sessionSubject.next(session);
  }

  logout(){
    const session: Session = {
      activeSession: false,
      activeUser: {
        username: '',
        password: '',
        admin: false
      }
    }

    this.sessionSubject.next(session);
  }

  getSession(): Observable<Session>{
    return this.sessionSubject.asObservable();
  }
}
