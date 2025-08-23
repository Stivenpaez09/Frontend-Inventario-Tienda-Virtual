import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionesUsuariosComponent } from './opciones-usuarios.component';

describe('OpcionesUsuariosComponent', () => {
  let component: OpcionesUsuariosComponent;
  let fixture: ComponentFixture<OpcionesUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpcionesUsuariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpcionesUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
