import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtokolleComponent } from './protokolle.component';

describe('ProtokolleComponent', () => {
  let component: ProtokolleComponent;
  let fixture: ComponentFixture<ProtokolleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtokolleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtokolleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
