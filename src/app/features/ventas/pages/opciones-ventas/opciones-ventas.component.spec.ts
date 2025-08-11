import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionesVentasComponent } from './opciones-ventas.component';

describe('OpcionesVentasComponent', () => {
  let component: OpcionesVentasComponent;
  let fixture: ComponentFixture<OpcionesVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpcionesVentasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpcionesVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
