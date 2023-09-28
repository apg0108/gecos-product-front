import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPagesComponent } from './product-pages.component';

describe('ProductPagesComponent', () => {
  let component: ProductPagesComponent;
  let fixture: ComponentFixture<ProductPagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductPagesComponent]
    });
    fixture = TestBed.createComponent(ProductPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
