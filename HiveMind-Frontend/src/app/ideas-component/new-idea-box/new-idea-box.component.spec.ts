import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaBoxComponent } from './idea-box.component';

describe('IdeaBoxComponent', () => {
  let component: IdeaBoxComponent;
  let fixture: ComponentFixture<IdeaBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdeaBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdeaBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
