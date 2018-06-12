import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfersComponent } from './list-ofers.component';

describe('ListOfersComponent', () => {
  let component: ListOfersComponent;
  let fixture: ComponentFixture<ListOfersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
