import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewMoviesComponent } from './user-view-movies.component';

describe('UserViewMoviesComponent', () => {
  let component: UserViewMoviesComponent;
  let fixture: ComponentFixture<UserViewMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserViewMoviesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
