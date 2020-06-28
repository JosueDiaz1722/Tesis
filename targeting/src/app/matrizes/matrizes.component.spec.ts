import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrizesComponent } from './matrizes.component';

describe('MatrizesComponent', () => {
  let component: MatrizesComponent;
  let fixture: ComponentFixture<MatrizesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrizesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
