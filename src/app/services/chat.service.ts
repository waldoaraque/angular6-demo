import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class ChatService {

  constructor(private angularFireDatabase: AngularFireDatabase) { }

  createChat(chat) {
    return this.angularFireDatabase.object('chats/' + chat.uid + '/' + chat.timestamp).set(chat);
  }

  getChat(uid) {
    return this.angularFireDatabase.list('chats/' + uid);
  }

  editChat(chat) {
    return this.angularFireDatabase.object('chats/' + chat.uid + '/' + chat.timestamp).set(chat);
  }

}
