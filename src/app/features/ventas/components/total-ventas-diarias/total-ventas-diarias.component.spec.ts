import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalVentasDiariasComponent } from './total-ventas-diarias.component';

describe('TotalVentasDiariasComponent', () => {
  let component: TotalVentasDiariasComponent;
  let fixture: ComponentFixture<TotalVentasDiariasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalVentasDiariasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalVentasDiariasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
