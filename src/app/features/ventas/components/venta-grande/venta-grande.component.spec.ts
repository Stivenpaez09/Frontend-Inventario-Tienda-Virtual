import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaGrandeComponent } from './venta-grande.component';

describe('VentaGrandeComponent', () => {
  let component: VentaGrandeComponent;
  let fixture: ComponentFixture<VentaGrandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentaGrandeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentaGrandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
