import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    if (!this.username || !this.password) {
      alert('Por favor, complete todos los campos');
      return;
    }

    this.authService.login(this.username, this.password).subscribe(
      (success) => {
        if (success) {
          this.router.navigate(['/products']);
        } else {
          alert('Credenciales incorrectas');
        }
      },
      (error) => {
        console.error('Error en el login:', error);
        alert('Ocurrió un error durante el inicio de sesión. Intente nuevamente.');
      }
    );
  }
}
