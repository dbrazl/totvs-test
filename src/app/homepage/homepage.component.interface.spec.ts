import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HomePageComponent } from './homepage.component';
import { SearchComponent } from '../search/search.component';
import { CompaniesListComponent } from '../companies-list/companies-list.component';

describe('HomePageComponent Interface', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HomePageComponent,
        SearchComponent,
        CompaniesListComponent,
      ],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render totvs logo', () => {
    const element = fixture.nativeElement.querySelector('.logo');
    expect(element).toBeTruthy();
  });

  it('should render search component', () => {
    const element = fixture.nativeElement.querySelector('.search');
    expect(element).toBeTruthy();
  });

  it('should render companies list component', () => {
    const element = fixture.nativeElement.querySelector('.companies-list');
    expect(element).toBeTruthy();
  });
});
