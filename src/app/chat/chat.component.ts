import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { ChatService } from '../services/chat.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  friendId: any;
  //friends: User[];
  friend: User;
  //today:any = Date.now();
  user: User;
  chat_id: string;
  textMessage: string;
  chat: any[];
  shake: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private chatService: ChatService,
    private authenticationService: AuthenticationService) { //can only be accessed from the constructor

      this.friendId = this.activatedRoute.snapshot.params['uid'];
      console.log(this.friendId);

      this.authenticationService.getStatus().subscribe(
        (session) => {
          this.userService.getUserById(session.uid).valueChanges().subscribe( //obtains the user
            (user: User) => {
              this.user = user;
              this.userService.getUserById(this.friendId).valueChanges().subscribe( //obtains the friend
                (data: User) => {
                  this.friend = data;                        //sort() => order the values of the array
                  const ids = [this.user.uid, this.friend.uid].sort(); //create a unique id for betwen users
                  this.chat_id = ids.join('|'); //join() => place the elements in a string separating them by '|'
                  this.getChat();
                }, (error) => {
                  console.log(error);
              });
            });
        });
  }

  ngOnInit() {
  }

  sendMessage() {
    const message = {
      uid: this.chat_id,
      timestamp: Date.now(),
      text: this.textMessage,
      sender: this.user.uid,
      receiver: this.friend.uid
    };
    this.chatService.createChat(message).then(() => {
      this.textMessage = '';
    });
  }

  sendZumbido() {
    const message = {
      uid: this.chat_id,
      timestamp: Date.now(),
      text: null,
      sender: this.user.uid,
      receiver: this.friend.uid,
      type: 'zumbido'
    };
    this.chatService.createChat(message).then(() => { });
    this.doZumbido();
  }

  doZumbido() {
    const audio = new Audio('assets/sound/zumbido.m4a');
    audio.play();
    this.shake = true;
    window.setTimeout( () => {
      this.shake = false
    }, 1000);
  }

  getChat() {
    this.chatService.getChat(this.chat_id).valueChanges().subscribe(
      (data) => {
        this.chat = data;
        this.chat.forEach( (message) => {
          if (!message.seen) {
            message.seen = true;
            this.chatService.editChat(message);
            if (message.type == 'text') {
              const audio = new Audio('assets/sound/new_message.m4a');
              audio.play();
            }
            else if (message.type == 'zumbido') {
              this.doZumbido();
            }
          }
        });
        console.log(data);
      }, (err) => {
        console.log(err);
      });
  }

  getUserAliasById (id) {
    if (id === this.friend.uid) {
      return this.friend.alias;
    }
    else {
      return this.user.alias;
    }
  }

}
