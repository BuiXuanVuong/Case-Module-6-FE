import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendListSuggestComponent } from './friend-list-suggest.component';

describe('FriendListSuggestComponent', () => {
  let component: FriendListSuggestComponent;
  let fixture: ComponentFixture<FriendListSuggestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendListSuggestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendListSuggestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
