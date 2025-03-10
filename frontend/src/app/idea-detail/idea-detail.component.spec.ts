import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaDetailComponent } from './idea-detail.component';

describe('IdeaDetailComponent', () => {
  let component: IdeaDetailComponent;
  let fixture: ComponentFixture<IdeaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdeaDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IdeaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
