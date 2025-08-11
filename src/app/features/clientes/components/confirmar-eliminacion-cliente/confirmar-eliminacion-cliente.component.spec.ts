import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarEliminacionClienteComponent } from './confirmar-eliminacion-cliente.component';

describe('ConfirmarEliminacionClienteComponent', () => {
  let component: ConfirmarEliminacionClienteComponent;
  let fixture: ComponentFixture<ConfirmarEliminacionClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmarEliminacionClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmarEliminacionClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
