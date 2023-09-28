import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/interface/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy{

  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private route = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  form !: FormGroup;
  sub !: Subscription;
  product !: Product;
  action !: string;
  id !: string;

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.sub = this.activatedRoute.queryParamMap.subscribe(param => {
      this.action = param.get('action') ?? '';
    });
    this.form = this.fb.group({
      id: [null],
      codigo: [null, [Validators.required]],
      nombre: [null, [Validators.required]]
    });
    this.form.get('id')?.disable();
    if (this.action !== '')
      this.cargarDatos();
    if (this.action === 'view')
      this.form.disable();
  }

  cargarDatos() {
    this.productService.getProduct(this.id).subscribe({
      next: product => {
        this.product = product;
        this.form.patchValue({id: product.id, codigo: product.code, nombre: product.name});
      },
      error : err => console.error(err)
    });
  }

  save(): void {
    if (this.form.valid) {
        const product: Product = {
          id: this.id,
          code: this.form.get('codigo')?.value,
          name: this.form.get('nombre')?.value
        };

        if (this.action === '') {
          this.productService.createProduct(product).subscribe({
            next: () => {
              this.route.navigateByUrl('');
            },
            error: err => {
              console.error(err);
            }
          });
        } else if (this.action === 'edit') {
          this.productService.editProduct(product).subscribe({
            next: () => {
              this.route.navigateByUrl('');
            },
            error: err => {
              console.error(err);
            }
          });
        }
    }
  }

}
