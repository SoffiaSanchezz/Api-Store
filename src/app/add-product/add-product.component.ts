import { Component } from '@angular/core';
import { ProductService } from '../product-list/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  product = {
    title: '',
    price: 0,
    description: '',
    image: null as File | null,  // Ahora la imagen es un archivo
  };
  errorMessage = '';
  isLoading = false;

  constructor(private productService: ProductService, private router: Router) {}

  // Manejar el cambio de imagen (cuando el usuario selecciona una imagen)
  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.product.image = file;  // Almacenar el archivo de la imagen seleccionada
    }
  }

  // Enviar el formulario para agregar el producto
  onSubmit(): void {
    // Validar los campos antes de enviar
    if (!this.product.title || !this.product.price || !this.product.description || !this.product.image) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    // Crear un FormData para enviar los datos, incluyendo la imagen si está presente
    const formData = new FormData();
    formData.append('title', this.product.title);
    formData.append('price', this.product.price.toString());
    formData.append('description', this.product.description);
    formData.append('image', this.product.image, this.product.image.name);  // Enviar la imagen como archivo

    // Mostrar el cargando mientras se procesa la solicitud
    this.isLoading = true;

    // Llamar al servicio para agregar el producto
    this.productService.addProduct(formData).subscribe({
      next: (data) => {
        this.isLoading = false;
        console.log('Product added successfully', data);
        this.router.navigate(['/product-list']);  // Redirigir a la lista de productos después de agregarlo
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error adding product', error);
        this.errorMessage = 'Error adding product. Please try again.';
        // Si es posible, mostrar detalles del error (si la API devuelve información)
        if (error.status === 400) {
          console.log('Invalid data:', error.error);
        }
      }
    });
  }
}
