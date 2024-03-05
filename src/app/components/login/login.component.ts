import {Component, inject, Provider} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Router} from "express";
import {AuthService} from "../../tablepagination/auth.service";
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import {environment} from "@ng-bootstrap/ng-bootstrap/environment";



@Component({
  selector: 'app-login',
  standalone: true,
  // providers: [
  //   {provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig}
  // ],
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatInputModule,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);
  authService = inject(AuthService);
  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  errorMessage: string | null = null;

  onSubmit(): void {
    const rawForm = this.form.getRawValue();
    this.authService.login(rawForm.email, rawForm.password).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        this.errorMessage = err.code;
      }
    });
  }
}

