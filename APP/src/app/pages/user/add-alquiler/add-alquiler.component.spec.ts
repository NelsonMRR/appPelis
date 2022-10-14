import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlquilerComponent } from './add-alquiler.component';

describe('AddAlquilerComponent', () => {
  let component: AddAlquilerComponent;
  let fixture: ComponentFixture<AddAlquilerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAlquilerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAlquilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
