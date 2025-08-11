import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionesClientesComponent } from './opciones-clientes.component';

describe('OpcionesClientesComponent', () => {
  let component: OpcionesClientesComponent;
  let fixture: ComponentFixture<OpcionesClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpcionesClientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpcionesClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
