import { Component, OnInit } from '@angular/core';
import { UserService } from './service/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-http';
  constructor(
    private userService: UserService
  ){}

  ngOnInit(): void {
    //get the function when it initialyse
    this.onGetUsers()
    this.onGetUser()
  }

  onGetUsers(): void {
    this.userService.getUsers().subscribe(
      (response) => console.log(response),
      (error: any) => console.log(error),
      () => console.log('Done Getting users')
    )
  }

  onGetUser(): void{
    this.userService.getUser().subscribe(
      (response) => console.log(response),
      (error: any) => console.log(error),
      () => console.log('Done Getting user')
    )
  }
}
