import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolRolOpcionesComponent } from './rol-rol-opciones.component';

describe('RolRolOpcionesComponent', () => {
  let component: RolRolOpcionesComponent;
  let fixture: ComponentFixture<RolRolOpcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolRolOpcionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolRolOpcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
