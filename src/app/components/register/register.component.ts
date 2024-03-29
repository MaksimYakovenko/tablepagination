import {Component, HostBinding, inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {HttpClient} from "@angular/common/http";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../tablepagination/auth.service";
import {raw} from "express";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";
import {OverlayContainer} from "@angular/cdk/overlay";
import {NgIf} from "@angular/common";

function passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const password = control.get('password');
  const confirm = control.get('confirm');
  return password && confirm && password.value !== confirm.value ? { 'passwordMismatch': true } : null;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatInputModule,
    MatIcon,
    MatToolbar,
    MatToolbarRow,
    NgIf,
    RouterLink,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  hide: boolean = true;
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  authService = inject(AuthService);
  router = inject(Router);
  toggleControl = new FormControl(false);
  @HostBinding('class') className = '';
  darkClassName = 'theme-dark';
  lightClassName = 'theme-light';

  constructor(private overlay: OverlayContainer) {
  }

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

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirm: ['', Validators.required],
  }, {validators: passwordMatchValidator});
  errorMessage: string | null = null;

  onSubmit(): void {
    const rawForm = this.form.getRawValue();
    if (rawForm.password !== rawForm.confirm) {
      this.errorMessage = 'Паролі не збігаються. Будь ласка спробуйте ще раз.'
      return;
    }
    this.authService.register(rawForm.email, rawForm.username, rawForm.password, rawForm.confirm).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        console.error(err);
        if (err.code === 'auth/email-already-in-use') {
          this.errorMessage = 'Така пошта вже зареєстрована';
        } else {
          this.errorMessage = 'Сталася помилка під час реєстрації. Будь ласка, спробуйте ще раз.';
        }
      }
    });
  }
}
