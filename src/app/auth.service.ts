import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(this.checkStoredLogin()); // Estado inicial basado en `localStorage`

  constructor() {}

  /**
   * Simula un inicio de sesión.
   * @param username Nombre de usuario ingresado.
   * @param password Contraseña ingresada.
   * @returns Un Observable<boolean> indicando si el inicio de sesión fue exitoso.
   */
  login(username: string, password: string): Observable<boolean> {
    if (username === 'admin' && password === 'password') {
      this.isAuthenticated.next(true);
      if (this.isLocalStorageAvailable()) {
        localStorage.setItem('isAuthenticated', 'true'); // Guardar en `localStorage` si está disponible
      }
      return of(true);
    }
    return of(false);
  }

  /**
   * Finaliza la sesión del usuario.
   */
  logout(): void {
    this.isAuthenticated.next(false);
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('isAuthenticated'); // Eliminar del `localStorage` si está disponible
    }
    console.log('El usuario ha cerrado sesión.');
  }

  /**
   * Verifica si el usuario está autenticado.
   * @returns Un boolean indicando si el usuario está autenticado.
   */
  isLoggedIn(): boolean {
    return this.isAuthenticated.value;
  }

  /**
   * Retorna un Observable del estado de autenticación.
   * @returns Un Observable<boolean> que emite el estado de autenticación.
   */
  getAuthStatus(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  /**
   * Verifica si existe una sesión almacenada en `localStorage`.
   * @returns Un boolean indicando si hay una sesión válida.
   */
  private checkStoredLogin(): boolean {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem('isAuthenticated') === 'true';
    }
    return false;
  }

  /**
   * Comprueba si `localStorage` está disponible en el entorno actual.
   * @returns Un boolean indicando si `localStorage` está disponible.
   */
  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
}
