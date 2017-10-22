import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicsampleComponent } from './publicsample.component';

describe('PublicsampleComponent', () => {
  let component: PublicsampleComponent;
  let fixture: ComponentFixture<PublicsampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicsampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicsampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
