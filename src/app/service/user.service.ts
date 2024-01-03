import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs'
import  {tap} from 'rxjs/operators'
import { User } from '../interface/user';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private  apiUrl=environment.apiUrl
  readonly moreParams = ['test', 'test2']
  constructor(private http: HttpClient) { }

  getUsersHeader(): Observable<User[]>{
    console.log('from getUsers()')
    //myheader is value immutable(in other word we can set data once and never can change it)
    let myHeaders = new HttpHeaders({'myheader':'headerValue'});
    //myheader.set('id','123') <- this code is wrong because myheader is immutable the value of my header never change but the element id is created in request header
    myHeaders=myHeaders.set('id','1234')
    //overide old value
    myHeaders=myHeaders.set('id','1234000')
    //append using for add new element no mather what this element even if want duplicated element
    myHeaders=myHeaders.append('id','00000')
    //return this.http.get<User[]>(`${this.apiUrl}/users`,{ headers:myHeaders })
    return this.http.get<User[]>(`${this.apiUrl}/users`)
    //we using pipe for do effect in data streaming and after that we continue streaming
      .pipe(
        tap(users => console.log(users))
      )
  }
  //params partie 2
  getUsersParams(): Observable<User[]>{
    //https://jsonplaceholder.typicode.com/users?page=5&sort=true
    let myParams = new HttpParams().set('page',5).set('sort','true')
    https://jsonplaceholder.typicode.com/users?page=5&sort=true&name=mugiwara
    myParams = myParams.append('name','mugiwara')
    https://jsonplaceholder.typicode.com/users?page=5&sort=true&name=mugiwara&name=zoro
    myParams = myParams.append('name','zoro')
    return this.http.get<User[]>(`${this.apiUrl}/users`, {params: myParams})
  }
  //params more readble using constructure params object of class HttpMarams
  getUsersParamsObjectConstrocture(): Observable<User[]>{
    //https://jsonplaceholder.typicode.com/users?testList=test&testList=test2
    const theParams = {['testList']: this.moreParams}
    let myParams = new HttpParams({fromObject: theParams})
    return this.http.get<User[]>(`${this.apiUrl}/users`, {params: myParams})
  }
  //params more readble using constructure params string of class HttpMarams
  getUsersParamsStringConstructure(): Observable<User[]>{
    //https://jsonplaceholder.typicode.com/users?name=mugiwara&id=45
    let myParams = new HttpParams({fromString: 'name=mugiwara&id=45'})
    return this.http.get<User[]>(`${this.apiUrl}/users`, {params: myParams})
  }
  getUsersEvents(): Observable<HttpEvent<User[]>>{
    return this.http.get<User[]>(`${this.apiUrl}/users`, {observe: 'events'})
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
  