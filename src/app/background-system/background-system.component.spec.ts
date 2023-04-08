import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundSystemComponent } from './background-system.component';

describe('BackgroundSystemComponent', () => {
  let component: BackgroundSystemComponent;
  let fixture: ComponentFixture<BackgroundSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackgroundSystemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackgroundSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
