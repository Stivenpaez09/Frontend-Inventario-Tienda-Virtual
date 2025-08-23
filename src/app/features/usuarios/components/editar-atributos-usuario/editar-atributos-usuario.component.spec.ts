import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAtributosUsuarioComponent } from './editar-atributos-usuario.component';

describe('EditarAtributosUsuarioComponent', () => {
  let component: EditarAtributosUsuarioComponent;
  let fixture: ComponentFixture<EditarAtributosUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarAtributosUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarAtributosUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
