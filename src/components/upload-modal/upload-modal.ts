import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { AngularFireUploadTask } from 'angularfire2/storage';
import { NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the UploadModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'upload-modal',
  templateUrl: 'upload-modal.html'
})
export class UploadModalComponent {
task: AngularFireUploadTask;
proggress: Observable<number>

  constructor(private params: NavParams, private view: ViewController) {
    console.log('Hello UploadModalComponent Component');
    this.task = this.params.get('task');
    this.proggress = this.task.percentageChanges()
  }


  cancel() {
    this.task.cancel();
    this.view.dismiss();
  }

}
