import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../tablepagination/auth.service";

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit{
  email: string = '';
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
  }
  forgotPassword() {
    this.auth.forgotPassword(this.email);
    this.email='';
  }

}
