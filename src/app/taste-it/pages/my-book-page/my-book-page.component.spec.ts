import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBookPageComponent } from './my-book-page.component';

describe('MyBookPageComponent', () => {
  let component: MyBookPageComponent;
  let fixture: ComponentFixture<MyBookPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyBookPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyBookPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
