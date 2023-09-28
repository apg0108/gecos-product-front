import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interface/product.interface';
import { ProductSeed } from '../interface/product-seed.interface';

const base_url = 'http://localhost:3000';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  createProduct(product: Product) {
    const url = `${base_url}/product`;
    return this.http.post(url, product);
  }

  getProducts() {
    const url = `${base_url}/product`
    return this.http.get<Product[]>(url);
  }

  editProduct(product: Product) {
    const url = `${base_url}/product`;
    return this.http.put(url, product);
  }

  deleteProduct(id: string) {
    const url = `${base_url}/product/${id}`
    return this.http.delete(url);
  }

  getProduct(id: string) {
    const url = `${base_url}/product/${id}`
    return this.http.get<Product>(url);
  }

  filterProducts(termino: string) {
    const url = `${base_url}/product?filter=${termino}`
    return this.http.get<Product[]>(url);
  }

  regenerar(productSeed: ProductSeed) {
    const url = `${base_url}/product/seed`
    return this.http.post(url, productSeed);
  }

}
