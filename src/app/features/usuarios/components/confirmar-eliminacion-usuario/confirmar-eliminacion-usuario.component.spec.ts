import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarEliminacionUsuarioComponent } from './confirmar-eliminacion-usuario.component';

describe('ConfirmarEliminacionUsuarioComponent', () => {
  let component: ConfirmarEliminacionUsuarioComponent;
  let fixture: ComponentFixture<ConfirmarEliminacionUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmarEliminacionUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmarEliminacionUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
