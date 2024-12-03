import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolOpcionesComponent } from './rol-opciones.component';

describe('RolOpcionesComponent', () => {
  let component: RolOpcionesComponent;
  let fixture: ComponentFixture<RolOpcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolOpcionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolOpcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
