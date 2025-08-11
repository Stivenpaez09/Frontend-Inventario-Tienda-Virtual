import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionesProductosComponent } from './opciones-productos.component';

describe('OpcionesProductosComponent', () => {
  let component: OpcionesProductosComponent;
  let fixture: ComponentFixture<OpcionesProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpcionesProductosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpcionesProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
