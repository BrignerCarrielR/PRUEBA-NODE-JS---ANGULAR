import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoUsuarioComponent } from './mantenimiento-usuario.component';

describe('MantenimientoUsuarioComponent', () => {
  let component: MantenimientoUsuarioComponent;
  let fixture: ComponentFixture<MantenimientoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MantenimientoUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MantenimientoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
