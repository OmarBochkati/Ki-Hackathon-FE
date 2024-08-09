import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessdocumentsComponent } from './processdocuments.component';

describe('ProcessdocumentsComponent', () => {
  let component: ProcessdocumentsComponent;
  let fixture: ComponentFixture<ProcessdocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessdocumentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessdocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
