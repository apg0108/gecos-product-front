import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Product } from 'src/app/interface/product.interface';
import { ProductService } from 'src/app/services/product.service';
import { faker } from '@faker-js/faker';
import { ProductSeed } from 'src/app/interface/product-seed.interface';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Display } from 'src/app/enums/display.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  private productService = inject(ProductService);
  public breakpointObserver = inject(BreakpointObserver);

  products !: Product[];
  loading : boolean = true;
  EnumDisplay = Display;
  display !: Display;
  sub !: Subscription;

  ngOnInit(): void {
    this.getProducts();
    this.querys();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  querys() {
    this.sub = this.breakpointObserver.observe(Breakpoints.Small).subscribe({
      next: (state: BreakpointState) => {
          if (state.matches)  this.display = Display.phone;
          else this.display = Display.desktop;
      }
    });
  }

  get lenghtProducts() {
    return this.products?.length ?? 0;
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.loading = false;
      }
    });
  }

  deleteProduct(identificador: string): void {
    this.loading = true;
    this.productService.deleteProduct(identificador).subscribe({
      next: () => {
        this.getProducts();
      },
      error: err => console.error(err)
    });
  }

  buscar(termino: string): void {
    setTimeout(() => {
      this.productService.filterProducts(termino).subscribe({
        next : products => {
          this.products = products;
        }
      });
    }, 1000);

  }

  regenerar(): void {
    this.loading = true;
    const quantity = Math.floor((Math.random() * 11));
    let names = [];
    for(let i = 0; i < quantity; i++) {
      names.push(faker.internet.displayName());
    }
    const productSeed : ProductSeed = {
      quantity : quantity,
      randomNames : names
    };
    this.productService.regenerar(productSeed).subscribe({
      next: () => this.getProducts()
    })
  }

}
