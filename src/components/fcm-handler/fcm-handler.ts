import { Component, OnInit, OnDestroy } from '@angular/core';
import  {tap} from 'rxjs/operators';
import { FcmProvider } from '../../providers/fcm/fcm';
import { ToastController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';



@Component({
  selector: 'fcm-handler',
  templateUrl: 'fcm-handler.html'
})
export class FcmHandlerComponent implements OnInit, OnDestroy {

  private sub: Subscription;


  constructor(private fcm: FcmProvider, private toast: ToastController) {
    console.log('Hello FcmHandlerComponent Component');

  }

  ngOnInit() {
    this.fcm.getToken();

    this.sub = this.fcm.monitorTokenRefresh() // unsubscribing could break functionality
    .subscribe()

    // listen for incoming messages

    this.sub.add(
      this.fcm.listenForNotifications()
      .pipe(
        tap(msg => {
          if (msg) { // will show a tost if the messsafe is defined

            const toast =  this.toast.create({
              message: msg.body,
              duration: 3000
            });
            toast.present()


          }
        })
      )
      .subscribe()
    )
  }





  ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe()
    }
    
  }

}
