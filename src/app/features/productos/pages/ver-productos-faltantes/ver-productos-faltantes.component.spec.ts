import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerProductosFaltantesComponent } from './ver-productos-faltantes.component';

describe('VerProductosFaltantesComponent', () => {
  let component: VerProductosFaltantesComponent;
  let fixture: ComponentFixture<VerProductosFaltantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerProductosFaltantesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerProductosFaltantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
