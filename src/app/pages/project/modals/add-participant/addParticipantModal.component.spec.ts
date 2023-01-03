import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParticipantModalComponent } from './addParticipantModal.component';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';


describe('ProjectComponent', () => {
  let component: AddParticipantModalComponent;
  let fixture: ComponentFixture<AddParticipantModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule 
      ],
      declarations: [ AddParticipantModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddParticipantModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
