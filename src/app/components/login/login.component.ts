import {Component, HostBinding, inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../tablepagination/auth.service";
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";
import {OverlayContainer} from "@angular/cdk/overlay";
import {MatIcon} from "@angular/material/icon";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatInputModule,
    HttpClientModule,
    MatToolbar,
    MatToolbarRow,
    RouterLink,
    MatIcon
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit{
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  hide: boolean = true;
  router = inject(Router);
  toggleControl = new FormControl(false);
  @HostBinding('class') className = '';
  darkClassName = 'theme-dark';
  lightClassName = 'theme-light';
  authService = inject(AuthService);
  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private overlay: OverlayContainer) {}
  errorMessage: string | null = null;

  ngOnInit() {
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      this.className = darkMode ? this.darkClassName : this.lightClassName;
      if (darkMode) {
        this.overlay.getContainerElement().classList.add(this.darkClassName);
      } else {
        this.overlay.getContainerElement().classList.remove(this.darkClassName);
      }
    })
  }

  onSubmit(): void {
    const rawForm = this.form.getRawValue();
    this.authService
      .login(rawForm.email, rawForm.password)
      .subscribe({
        next: () => {
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        this.errorMessage = err.code;
      },
    });
  }
}

