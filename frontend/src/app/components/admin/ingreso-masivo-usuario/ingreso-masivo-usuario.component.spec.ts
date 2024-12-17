import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoMasivoUsuarioComponent } from './ingreso-masivo-usuario.component';

describe('IngresoMasivoUsuarioComponent', () => {
  let component: IngresoMasivoUsuarioComponent;
  let fixture: ComponentFixture<IngresoMasivoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngresoMasivoUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngresoMasivoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
