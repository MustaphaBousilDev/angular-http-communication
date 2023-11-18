import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    //myheader is value immutable(in other word we can set data once and never can change it)
    let myHeaders = new HttpHeaders({'myheader':'headerValue'});
    //myheader.set('id','123') <- this code is wrong because myheader is immutable the value of my header never change but the element id is created in request header
    myHeaders=myHeaders.set('id','1234')
    //overide old value
    myHeaders=myHeaders.set('id','1234000')
    myHeaders=myHeaders.append('id','00000')
    return this.http.get<User[]>(`${this.apiUrl}/users`,{ headers:myHeaders })
  }

  getUser(): Observable<User>{
    console.log('from getUser()')
    return this.http.get<User>(`${this.apiUrl}/users/1`)
  }

  createUser(user: User): Observable<User>{
    return this.http.post<User>(`${this.apiUrl}/users`,user)
  }

  updateUser(user:User): Observable<User>{
    return this.http.put<User>(`${this.apiUrl}/users/${user.id}`,user)
  }

  patchUser(user: User): Observable<User>{
    return this.http.patch<User>(`${this.apiUrl}/users/${user.id}`,user)
  }

  deleteUser(id:number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`)
  }
}
  