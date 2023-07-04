import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../service/auth.service';
import { Constants } from '../../data/constants';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  protected readonly Constants = Constants;
  protected form: FormGroup = new FormGroup({});

  protected authService = inject(AuthService);
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['user', Validators.required],
      password: ['12345', Validators.required],
    });
  }

  login() {
    if (!this.form?.valid) return;

    const { username, password } = this.form.value;
    this.authService
      .login({ username, password }, Constants.routes.todo)
      .subscribe();
  }
}
