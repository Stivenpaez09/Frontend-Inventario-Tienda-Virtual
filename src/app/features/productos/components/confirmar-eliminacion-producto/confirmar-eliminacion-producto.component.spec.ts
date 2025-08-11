import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarEliminacionProductoComponent } from './confirmar-eliminacion-producto.component';

describe('ConfirmarEliminacionProductoComponent', () => {
  let component: ConfirmarEliminacionProductoComponent;
  let fixture: ComponentFixture<ConfirmarEliminacionProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmarEliminacionProductoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmarEliminacionProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
