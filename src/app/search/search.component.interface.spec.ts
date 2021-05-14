import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SearchComponent } from './search.component';
import { CompanyService } from '../company.service';

import expectedCompanies from '../../assets/mocks/companies';

describe('SearchComponent Interface', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let service: CompanyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      providers: [CompanyService],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(CompanyService);
    fixture.detectChanges();
  });

  beforeEach(async () => {
    spyOn(service, 'getCompanies').and.returnValue(
      Promise.resolve(expectedCompanies)
    );
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have input to write catch search term', () => {
    const element = fixture.nativeElement.querySelector('.search-input');
    expect(element).toBeTruthy();
  });

  it('should have a button to submit form', () => {
    const element = fixture.nativeElement.querySelector('.submit-button');
    expect(element).toBeTruthy();
  });

  it('should have a icon on submit button', () => {
    const element = fixture.nativeElement.querySelector('.submit-button');
    const img = element.querySelector('img.icon');
    expect(img).toBeTruthy();
  });

  it('should have a placeholder on input said "Pesquisar empresa"', () => {
    const element = fixture.nativeElement.querySelector('.search-input');
    expect(element.placeholder).toBe('Pesquisar empresa');
  });

  it('should display list of search suggestion when searching', () => {
    component.onSearch('');
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.suggestions-list');
    expect(element).toBeFalsy();

    component.onSearch('Company 1');
    fixture.detectChanges();
    const element2 = fixture.nativeElement.querySelector('.suggestions-list');
    expect(element2).toBeTruthy();
  });

  it('should the search suggestion list display suggestions on search', () => {
    component.onSearch('Company 1');
    fixture.detectChanges();

    const list = fixture.nativeElement.querySelector('.suggestions-list');
    const LIs = list.querySelectorAll('.suggestion');
    expect(LIs.length).toBe(1);
  });

  it('should hide suggestion list when user click over suggestion', () => {
    component.onSearch('Company 1');
    fixture.detectChanges();

    const list = fixture.nativeElement.querySelector('.suggestions-list');
    const LIs = list.querySelectorAll('.suggestion');
    LIs[0].dispatchEvent(new Event('click'));
    fixture.detectChanges();

    const listAfter = fixture.nativeElement.querySelector('.suggestions-list');
    expect(listAfter).toBeFalsy();
  });
});
