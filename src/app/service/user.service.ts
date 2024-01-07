import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs'
import  {map, tap} from 'rxjs/operators'
import { User } from '../interface/user';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private  apiUrl=environment.apiUrl
  readonly moreParams = ['test', 'test2']
  readonly defaultImg="https://robohash.org"
  constructor(private http: HttpClient) { }
  getUserWithoutTap(): Observable<User[]>{
    //function directly returns the observable obtained from the HTTP request without any additional processing or logging. It fetches users and returns the result.
    return this.http.get<User[]>(`${this.apiUrl}/users`)
  }
  getUsers(): Observable<User[]>{
    //the pipe operator is used to attach the tap operator to the observable. The tap operator is used to log the fetched users to the console before returning the observable
    return this.http.get<User[]>(`${this.apiUrl}/users`).pipe(
      tap(users => console.log(users)),
      map(users => users.map(user =>({
        ...user,
        name:user.name.toUpperCase(),
        isAdmin: user.id === 10 ? 'admin' : 'user' ,
        image: `${this.defaultImg}/${user.username.toLowerCase()}`,
        fuckingEmail:user.email,
        searchKey: [user.name,user.username]
      })))
    )
  }

  getUser(): Observable<User>{
    console.log('from getUser()')
    return this.http.get<User>(`${this.apiUrl}/users/1`).pipe(
      map(user=>{
        return {
          ...user,
          isAdmin: 'admin',
          searchKey: [user.name,user.username]
        }
      })
    )
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
  