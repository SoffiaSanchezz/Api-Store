import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];  // Arreglo para almacenar los productos
  loading: boolean = true;  // Para mostrar un cargando mientras se obtienen los productos

  constructor(
    private productService: ProductService,
    public authService: AuthService,  // Usamos authService para verificar el estado de autenticación
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtenemos la lista de productos desde el servicio ProductService
    this.productService.getProducts().subscribe((data) => {
      this.products = data;  // Asignamos los productos recibidos a la variable products
      this.loading = false;   // Cambiamos el estado de carga a falso
    });
  }

  // Método para ver los detalles de un producto
  viewProductDetails(productId: number): void {
    this.router.navigate([`/product-details/${productId}`]);  // Redirige a la vista de detalles del producto
  }

  // Método que maneja la acción de agregar un nuevo producto
  addProduct(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);  // Redirige al login si el usuario no está autenticado
    } else {
      this.router.navigate(['/add-product']);  // Redirige al formulario para agregar un nuevo producto
    }
  }

  // Método para editar un producto
  editProduct(productId: number): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);  // Redirige al login si el usuario no está autenticado
    } else {
      console.log(`Editar producto con ID: ${productId}`);
      this.router.navigate([`/edit-product/${productId}`]);  // Redirige a la página de edición
    }
  }

  // Método para eliminar un producto
  deleteProduct(productId: number): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);  // Redirige al login si el usuario no está autenticado
    } else {
      this.productService.deleteProduct(productId).subscribe(() => {
        // Filtramos el producto eliminado de la lista
        this.products = this.products.filter(product => product.id !== productId);
        console.log('Producto eliminado');
      });
    }
  }
}
