import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarEliminacionVentaComponent } from './confirmar-eliminacion-venta.component';

describe('ConfirmarEliminacionVentaComponent', () => {
  let component: ConfirmarEliminacionVentaComponent;
  let fixture: ComponentFixture<ConfirmarEliminacionVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmarEliminacionVentaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmarEliminacionVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
