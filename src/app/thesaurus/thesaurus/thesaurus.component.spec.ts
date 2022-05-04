import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThesaurusComponent } from './thesaurus.component';

describe('ThesaurusComponent', () => {
  let component: ThesaurusComponent;
  let fixture: ComponentFixture<ThesaurusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThesaurusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThesaurusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
