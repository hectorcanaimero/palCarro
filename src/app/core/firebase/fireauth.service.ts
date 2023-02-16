import { Injectable } from "@angular/core";
import {
  Auth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  authState,
} from '@angular/fire/auth';
import { Firestore } from "@angular/fire/firestore";
import { from, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FireAuthService {
  user$!: any;
  constructor(
    private auth: Auth,
    private fireStore: Firestore,
  ) {
    this.user$ = authState(this.auth);
  }

  signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signLoginGoogle() {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider))
    .pipe(
      tap((credential) => console.log(credential))
    )
  }

  forgotPassword(email: string) {}
  signOut() {}
}
