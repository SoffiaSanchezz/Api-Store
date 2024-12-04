import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product-list/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
  product: any = {
    title: '',
    price: '',
    images: []
  };
  loading: boolean = true;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(Number(productId)).subscribe((data) => {
        this.product = data;
        this.loading = false;
      });
    }
  }

  // saveChanges(): void {
  //   this.productService.updateProduct(this.product).subscribe(() => {
  //     alert('Producto actualizado con éxito');
  //     this.router.navigate(['/products']);
  //   });
  // }
}
