import { Component, Input, Output, EventEmitter } from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from 'angularfire2/storage';
import {ModalController, NavParams, ViewController} from 'ionic-angular';

import {filter, tap, take } from 'rxjs/operators';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { UploadModalComponent } from '../upload-modal/upload-modal';

@Component({
  selector: 'image-upload',
  templateUrl: 'image-upload.html'
})
export class ImageUploadComponent {

  @Input() userId: string;
  @Output() UploadFinished = new EventEmitter<string>();
  task: AngularFireUploadTask; // controlls the upload proccess
  public image: string;


  constructor(
    private storage: AngularFireStorage,
    private modalCtrl: ModalController,
    private camera: Camera
  ) {
    console.log('Hello ImageUploadComponent Component');

  }

  public startUpload(file: string) {
    const path = `${this.userId}/${new Date().getTime()}`;
    console.log('the storage path ', path);
// the main task 
      this.image = 'data:image/jpg;base64,' + file;
      console.log('starting the upload task ');

      this.task = this.storage.ref(path).putString(this.image, 'data_url') // adding the image to a specific point

      let uploadModal = this.modalCtrl.create(UploadModalComponent, {task: this.task})
      uploadModal.present();

      this.task.percentageChanges() // monotoring the upload percentage
      .pipe(
        filter(val => val === 100),
        take(1),
        tap(complete => {
          uploadModal.dismiss()
        })
      ).subscribe()


      // listening for the download url 
      this.task.downloadURL().pipe(
        take(1),
        tap(url => {
          this.UploadFinished.emit(url); // passing on the url
        })
      ).subscribe()
  }


   captureAndUpload() {
    console.log('accessing camera')
    const CameraOptions: CameraOptions ={
      quality: 33,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.ALLMEDIA,
      sourceType: this.camera.PictureSourceType.CAMERA
    }


    this.camera.getPicture(CameraOptions)
    .then(imgData => {
      
      console.log('uploading the image ')
      return imgData;
    })
    .then(base64 => {
      this.startUpload(base64);
    })
    .catch(err => {
      console.log('somthing went wrong ', err)
    })
    
   
  }

}
