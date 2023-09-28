import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductRoutingModule } from './components/product-routing.module';

const routes: Routes = [
  {path: '', loadChildren: () => import('./components/product.module').then(p => p.ProductModule), pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ProductRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
