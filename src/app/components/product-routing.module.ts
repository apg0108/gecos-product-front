import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductPagesComponent } from './product-pages.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  { path: 'products', component: ProductPagesComponent,
  children: [
    { path: '', component: ProductsComponent },
    { path: 'new', component: ProductComponent },
    { path: ':id', component: ProductComponent }
  ]
  },
 { path: '', redirectTo: 'products', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
