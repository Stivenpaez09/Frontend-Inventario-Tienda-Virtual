import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAtributosClientesComponent } from './editar-atributos-clientes.component';

describe('EditarAtributosClientesComponent', () => {
  let component: EditarAtributosClientesComponent;
  let fixture: ComponentFixture<EditarAtributosClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarAtributosClientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarAtributosClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
