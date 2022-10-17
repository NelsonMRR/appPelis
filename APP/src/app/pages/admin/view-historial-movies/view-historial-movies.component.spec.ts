import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHistorialMoviesComponent } from './view-historial-movies.component';

describe('ViewHistorialMoviesComponent', () => {
  let component: ViewHistorialMoviesComponent;
  let fixture: ComponentFixture<ViewHistorialMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewHistorialMoviesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHistorialMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
