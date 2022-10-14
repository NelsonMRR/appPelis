import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAlquileresComponent } from './view-alquileres.component';

describe('ViewAlquileresComponent', () => {
  let component: ViewAlquileresComponent;
  let fixture: ComponentFixture<ViewAlquileresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAlquileresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAlquileresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
