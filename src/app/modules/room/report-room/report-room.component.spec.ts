import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportRoomComponent } from './report-room.component';

describe('ReportRoomComponent', () => {
  let component: ReportRoomComponent;
  let fixture: ComponentFixture<ReportRoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportRoomComponent]
    });
    fixture = TestBed.createComponent(ReportRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
