import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierNameComponent } from './supplier-name.component';

describe('SupplierNameComponent', () => {
  let component: SupplierNameComponent;
  let fixture: ComponentFixture<SupplierNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
