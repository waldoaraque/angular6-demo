import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RequestsService } from '../services/requests.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  friends: User[];
  query: string = ''; //filter data using pipe in front
  friendEmail: string = '';
  user: User;

  constructor(private userService: UserService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private modalService: NgbModal,
    private requestsService: RequestsService) {

    this.userService.getUsers().valueChanges().subscribe((data: User[]) => {
        this.friends = data;
      }, (err) => {
        console.log(err);
    });

    this.authenticationService.getStatus().subscribe((status) => {
      this.userService.getUserById(status.uid).valueChanges().subscribe((data: User) => {
        this.user = data;
        console.log(this.user);
        if (this.user.friends) {
          this.user.friends = Object.values(this.user.friends);
          console.log(this.user);
        }
      });
    });
  }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logOut().then( () => {
      alert('Session Closed');
      this.router.navigate(['login']);
    }).catch( (err) => {
      console.log(err)
    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  sendRequest() {
    const request = {
      timestamp: Date.now(),
      receiver_email: this.friendEmail,
      sender: this.user.uid,
      status: 'pending'
    };
    this.requestsService.createRequest(request).then( () => {
      alert('Request sended');
    }).catch( (err) => {
      alert('An error has been ocurred');
      console.log(err);
    })
  }

}
