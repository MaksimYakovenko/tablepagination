import {inject, Injectable} from "@angular/core";
import {
  Auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  updateProfile
} from "@angular/fire/auth";
import {from, Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuth = inject(Auth)

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
    ).then(() => {
    });
    return from(promise);
  }
}
