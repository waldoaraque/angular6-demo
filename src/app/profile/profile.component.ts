import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
//import { FirebaseStorage } from '@angular/fire/storage';
import { AngularFireStorage } from '@angular/fire/storage';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  user: User;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  picture: any;

  constructor(private userService: UserService,
    private authenticationService: AuthenticationService,
    private firebaseStorage: AngularFireStorage) {
    this.authenticationService.getStatus().subscribe(
      (status) => {
        this.userService.getUserById(status.uid).valueChanges().subscribe(
          (data: User) => {
            this.user = data;
            console.log(this.user);
          }, (err) => {
            console.log(err);
          })
      }, (err) => {
        console.log(err);
      })

  }

  ngOnInit() {
  }

  saveSettings() {
    if (this.croppedImage) {
      const currentPictureId = Date.now(); //unique id to photos
      const pictures = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg').putString(this.croppedImage, 'data_url');
      pictures.then(
        (result) => {
          this.picture = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg').getDownloadURL();
          this.picture.subscribe(
            (url) => {
              this.userService.setAvatar(url, this.user.uid).then(
                () => {
                  alert('Avatar uploaded');
                }).catch( (err) => {
                  alert('An error has been ocurred');
                  console.log(err);
                });
            });
        }).catch( (err) => {
        console.log(err);
      })
    } else {
      this.userService.editUser(this.user).then(() => {
        alert('Chages Saved');
      }).catch((error) => {
        alert('An error has been ocurred');
        console.log(error);
      });
    }

    this.userService.editUser(this.user).then( () => {
      alert('Changes Saved');
    }).catch( (err) => {
      alert('An error has been ocurred');
      console.log(err);
    })
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }

  imageLoaded() {
      // show cropper
  }

  loadImageFailed() {
      // show message
  }

}
