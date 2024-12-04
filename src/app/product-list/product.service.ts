import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/products';  // URL de tu API
  private categoriesUrl = 'https://api.escuelajs.co/api/v1/categories'; // URL para obtener las categorías

  constructor(private http: HttpClient) {}


  // Obtener todas las categorías
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.categoriesUrl);
  }

  // Obtener todos los productos
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Agregar un nuevo producto
  addProduct(product: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, product);
  }


  // Eliminar un producto
  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Obtener un producto por su ID
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Actualizar un producto (incluye la opción de cambiar la imagen)
  updateProduct(product: any, newImage: File | null): Observable<any> {
    const formData = new FormData();

    // Agregar los datos del producto al FormData
    for (const key in product) {
      if (product[key] !== undefined && product[key] !== null) {
        formData.append(key, product[key]);
      }
    }

    // Si existe una nueva imagen, agregarla al FormData
    if (newImage) {
      formData.append('image', newImage, newImage.name);  // El nombre de la imagen se conserva
    }

    // Realizar la solicitud PUT para actualizar el producto
    return this.http.put<any>(`${this.apiUrl}/${product.id}`, formData);
  }
}
