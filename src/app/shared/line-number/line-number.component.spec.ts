import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineNumberComponent } from './line-number.component';

describe('LineNumberComponent', () => {
  let component: LineNumberComponent;
  let fixture: ComponentFixture<LineNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
