import { Component, OnInit } from '@angular/core';
import { UserService } from './service/user.service';
import { User } from './interface/user';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-http';
  private user:any={
      id:5,
      name: "mugiwara luffy",
      username: "Bret",
      email: "Sincere@april.biz",
      address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",
        geo: {
          lat: "-37.3159",
          lng: "81.1496"
        }
      },
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org",
      company: {
        name: "Romaguera-Crona little fuck",
        catchPhrase: "Multi-layered client-server neural-net",
        bs: "harness real-time e-markets"
      }
  }
  constructor(
    private userService: UserService
  ){}

  ngOnInit(): void {
    //get the function when it initialyse
    this.onGetUsers()
    //this.onGetUser()
    //this.onCreateUser()
    //this.onUpdateUser()
    //this.onPatchUser()
    //this.onDeleteUser()
  }

  onGetUsers(): void {
    this.userService.getUsersEvents().subscribe(
      (response) => console.table(response),
      (error: any) => console.log(error),
      () => console.log('Done Getting users')
    )
  }

  onGetUser(): void{
    this.userService.getUser().subscribe(
      (response) => console.log('Response from Delete',response),
      (error: any) => console.log(error),
      () => console.log('Done Getting user')
    )
  }

  onCreateUser(): void{
    this.userService.createUser(this.user).subscribe(
      (response) => console.log(response),
      (error: any) => console.log(error),
      () => console.log('Done Creating user')
    )
  }

  onUpdateUser():void{
    this.userService.updateUser(this.user).subscribe(
      (response) => console.log(response),
      (error: any) => console.log(error),
      () => console.log('Done updating user user')
    )
  }

  onPatchUser():void{
    this.userService.patchUser(this.user).subscribe(
      (response) => console.log(response),
      (error: any) => console.log(error),
      () => console.log('Done patching user')
    )
  }

  onDeleteUser(): void{
    this.userService.deleteUser(5).subscribe(
      (response) => console.log(response),
      (error: any) => console.log(error),
      () => console.log('DOne deleting user')
    )
  }


}
