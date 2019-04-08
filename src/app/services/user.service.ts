import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private angularFireDatabase: AngularFireDatabase) { }

  getUsers() { //return all users
    return this.angularFireDatabase.list('/users');
  }

  getUserById(uid) { //return only one user
    return this.angularFireDatabase.object('/users/' + uid);
  }

  createUser(user) {
    //ref a node in db and insert the user
    return this.angularFireDatabase.object('/users/' + user.uid).set(user);
  }

  editUser(user) {
    //ref a node in db and insert the user
    return this.angularFireDatabase.object('/users/' + user.uid).set(user);
  }

  setAvatar(avatar, uid) {
    return this.angularFireDatabase.object('/users/' + uid + '/avatar').set(avatar);
  }

  addFriend(userId, friendId) {
    this.angularFireDatabase.object('users/' + userId + '/friends/' + friendId).set(friendId);
    return this.angularFireDatabase.object('users/' + friendId + '/friends/' + userId).set(userId);
  }

}
