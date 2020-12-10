import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusdatenReadComponent } from './busdaten-read.component';

describe('BusdatenReadComponent', () => {
  let component: BusdatenReadComponent;
  let fixture: ComponentFixture<BusdatenReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusdatenReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusdatenReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
