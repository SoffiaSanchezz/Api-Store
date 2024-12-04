import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ProductService } from '../product-list/product.service';  // Importa el ProductService

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  categories: any[] = [];  // Para almacenar las categorías

  constructor(public authService: AuthService,private router: Router,         
    private productService: ProductService  // Inyecta el ProductService
  ){}

  ngOnInit(): void {
    // Llamar al servicio para obtener las categorías
    this.productService.getCategories().subscribe((data) => {
      this.categories = data;  // Asignar las categorías a la propiedad
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
