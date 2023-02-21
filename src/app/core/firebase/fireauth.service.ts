import { Injectable } from "@angular/core";
import * as fs from '@angular/fire/firestore';
import { Firestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { GoogleAuthProvider } from "firebase/auth";

import { from, Observable, switchMap, tap, timer } from "rxjs";
import { User } from "@core/interfaces/user.interface";
import { UtilsService } from "@core/services/utils.service";
import { UserCredential } from "@angular/fire/auth";
import { StorageService } from "@core/services/storage.service";

@Injectable({
  providedIn: 'root'
})
export class FireAuthService {
  userData: any;
  constructor(
    private fireStore: Firestore,
    private auth: AngularFireAuth,
    private uService: UtilsService,
    private storage: StorageService,
  ) {
    this.auth.authState.subscribe(async (user) => {
      if (user) {
        await this.storage.create('oUser', user);
      }
    })
  }

  async createUser(user: User) {
    return this.auth.createUserWithEmailAndPassword(user.email, user.password)
    .then(async (userCredential: any) => {
      await this.addUserData(user, userCredential.user.uid);
      this.uService.modalDimiss();
      await this.setAlert('Info', 'Su cuenta fue creada con éxito!');
    })
    .catch(async (error) => {
      await this.setAlert('Error', error.message);
    });
  }

  signIn(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password)
    .then(async (result: any) => {
      // await this.addUserData(null, result.user, 'password');
      this.updateUserSignIn(result.user);
      this.uService.navigateUrl('/pages/home');
    })
    .catch(async (error) => {
      await this.setAlert('Error', error.message);
    });
  }

  async signLoginGoogle() {
    const provider = new GoogleAuthProvider();
    const userCredential = await this.auth.signInWithPopup(provider);
    // await this.storage.create('oUser', userCredential.user);
    await this.updateUserSignGoogle(userCredential.user);
    return this.uService.navigateUrl('/pages/home');
  }

  forgotPassword(email: string) {
    return this.auth.sendPasswordResetEmail(email)
    .then(async (res: any) => {
      console.log(res);
      await this.setAlert('Info',
        'Fue enviado a su email, instrucciones para resetear tu contraseña!')
    })
    .catch(async(error: any) => {
      console.log(error);
      await this.setAlert('Error', error.message)
    })
  }

  async signOut() {
    this.uService.loading({ message: 'Eliminando rastros en tu cachê', duration: 1000 });
    await this.storage.delete();
    this.auth.signOut();
    timer(1000).subscribe(() => this.uService.navigateUrl('/users/login'))
  }

  private async addUserData(user: any, uid: string) {
    const item = {
      uid,
      term: true,
      photoURL: '',
      email: user.email,
      phone: user.phone,
      provide: 'password',
      displayName: user.displayName,
      createdAt: fs.Timestamp.fromMillis(new Date().getTime()),
    }
    fs.setDoc(fs.doc(this.fireStore, `users/${uid}`), item);
  }

  private updateUserSignIn(user: any) {
    const item = {
      email: user.email,
      provide: 'password',
      lastLoginAt: +user.metadata.lastLoginAt
    }
    console.log(item);
    fs.updateDoc(fs.doc(this.fireStore, `users/${user.uid}`), item);
  }

  private async updateUserSignGoogle(user: any) {
    const item: any = {
      provide: 'google',
      photoURL: user.photoURL,
      lastLoginAt: +user.metadata.lastLoginAt
    }
    const docRef = fs.doc(this.fireStore, 'users', user.uid);
    const docSnap = await fs.getDoc(docRef);
    if (docSnap.exists()) {
      fs.updateDoc(fs.doc(this.fireStore, `users/${user.uid}`), item);
    } else {
      item.email = user.email,
      item.phone = user.phoneNumber || '',
      item.displayName = user.displayName;
      item.createdAt = fs.Timestamp.fromMillis(new Date().getTime()),
      fs.setDoc(fs.doc(this.fireStore, `users/${user.uid}`), item);
    }
  }

  private async setAlert(header: string, message: string) {
    return this.uService.alert({
      header, message,
      buttons: ['OK']
    })
  }
}
