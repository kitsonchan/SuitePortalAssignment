import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'sp-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  message: string = ''

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  adminLoginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

  onSubmit() {
    // imitating login API logic

    if (this.adminLoginForm.value.username === 'admin' && this.adminLoginForm.value.password === 'Admin1234!') {
      this.authService.setIsAuthenticated(true)
      this.router.navigateByUrl('/admin/home')
    } else {
      this.message = 'Login Failed.'
    }
  }
}
