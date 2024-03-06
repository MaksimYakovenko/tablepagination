import {inject, Injectable, signal} from "@angular/core";
import {
  Auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword, signOut,
  updateProfile, user
} from "@angular/fire/auth";
import {from, Observable} from "rxjs";
import {UserInterface} from "./user.interface";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuth = inject(Auth)
  user$ = user(this.firebaseAuth);
  currentUserSig = signal<UserInterface | null | undefined>(undefined);
  constructor(private fireauth: AngularFireAuth, private router: Router) {
  }
  register(email: string, username: string, password: string, confirm: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password,
    ).then(response => {
      return updateProfile(response.user, {displayName: username})
        .then(() => {
          return sendEmailVerification(response.user);
        });
    });
    return from(promise);
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password,
    ).then(() => {});
    return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth);
    return from(promise);
  }

  forgotPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(() => {
      this.router.navigate(['/verify-email']);
    }, err => {
      alert('Щось пішло не так!');
    })
  }
}
