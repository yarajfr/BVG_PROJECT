import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeineListeComponent } from './meine-liste.component';

describe('MeineListeComponent', () => {
  let component: MeineListeComponent;
  let fixture: ComponentFixture<MeineListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeineListeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeineListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
