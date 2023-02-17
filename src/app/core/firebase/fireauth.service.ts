import { Injectable } from "@angular/core";
import * as fs from '@angular/fire/firestore';
import { Firestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/compat/auth";

import { from, tap } from "rxjs";
import { User } from "@core/interfaces/user.interface";
import { UtilsService } from "@core/services/utils.service";
import { UserCredential } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class FireAuthService {
  user$!: any;
  constructor(
    private fireStore: Firestore,
    private auth: AngularFireAuth,
    private uService: UtilsService,
  ) {
  }

  async createUser(user: User) {
    return this.auth.createUserWithEmailAndPassword(user.email, user.password)
    .then(async (userCredential: any) => {
      console.log(userCredential);
      user.uid = userCredential.user.uid;
      await this.addUserData(user);
      this.uService.modalDimiss();
      await this.setAlert('Info', 'Su cuenta fue creada con éxito!');
    })
    .catch(async (error) => {
      await this.setAlert('Error', error.message);
    });
  }

  signIn(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password)
    .then((result) => {
      this.uService.navigateUrl('/pages/home');
    })
    .catch(async (error) => {
      await this.setAlert('Error', error.message);
    });
  }

  signLoginGoogle() {
    // const provider = new GoogleAuthProvider();
    // return from(signInWithPopup(this.auth, provider))
    // .pipe(
    //   tap((credential) => console.log(credential))
    // )
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
    return this.auth.signOut();
  }

  private async addUserData(data: User) {
    data.createdAt = fs.Timestamp.fromMillis(new Date().getTime())
    data.password = '';
    return fs.setDoc(fs.doc(this.fireStore, `users/${data.uid}`), data);
  }

  private async setAlert(header: string, message: string) {
    return this.uService.alert({
      header, message,
      buttons: ['OK']
    })
  }
}
