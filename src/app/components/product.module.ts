import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';
import { ProductPagesComponent } from './product-pages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Material
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [
    ProductComponent,
    ProductsComponent,
    ProductPagesComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MatDialogModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatCardModule
  ]
})
export class ProductModule { }
