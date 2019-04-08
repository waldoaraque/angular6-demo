import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @Input() uid: string; //input allows receive data from other component!!
  contact: User;

  constructor( private userService: UserService) { }

  ngOnInit() {
    console.log(this.uid);
    this.userService.getUserById(this.uid).valueChanges().subscribe((data: User) => {
      this.contact = data;
      console.log(this.contact);
    });
  }

}
