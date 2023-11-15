import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { User } from '../interface/user';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    console.log('from getUsers()')
    return this.http.get<User[]>(`${this.apiUrl}/users`)
  }

  getUser(): Observable<User>{
    console.log('from getUser()')
    return this.http.get<User>(`${this.apiUrl}/users/1`)
  }
}
  