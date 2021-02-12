import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrueferComponent } from './pruefer.component';

describe('PrueferComponent', () => {
  let component: PrueferComponent;
  let fixture: ComponentFixture<PrueferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrueferComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrueferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
