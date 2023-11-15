import { Component } from '@angular/core';
import { Observable} from 'rxjs'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-http';
  constructor(){
    type HttpResponse={code:number,data:string}

    const observable=new Observable<HttpResponse>(subsriber=>{
      console.log('inside subscriber...')
      subsriber.next({code:200,data:'this is data 1 ....'})
      subsriber.next({code:200,data:'this is data 2...'})
      subsriber.next({code:200,data:'this is data 3....'})
      subsriber.error({code:500,msg:'An Error occurred'})
      setTimeout(()=>{
        subsriber.next({code:200,data:'this is data more data ...'})
        subsriber.complete()
      },3*1000)
      console.log('subscriber is done emiting...')
    })
    //subscribe is for execute owr code (so without subscriber no one interest of this data sow it does not even run)
    observable.subscribe({
      next(response:HttpResponse){
        console.log('got Response',response)
      },
      error(error:any){
        console.error('something wrong occurred: ',error)
      },
      complete(){
        console.log('done')
      }
    })
  }
}
