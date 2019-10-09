import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVoiceComponent } from './edit-voice.component';

describe('EditVoiceComponent', () => {
  let component: EditVoiceComponent;
  let fixture: ComponentFixture<EditVoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
