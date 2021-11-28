import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSignUpComponent } from './project-signup.component';

describe('ProjectSignUpComponent', () => {
  let component: ProjectSignUpComponent;
  let fixture: ComponentFixture<ProjectSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectSignUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
