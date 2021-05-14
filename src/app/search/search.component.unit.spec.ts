import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SearchComponent } from './search.component';
import { CompanyService } from '../company.service';

import expectedCompanies from '../../assets/mocks/companies';

describe('SearchComponent Unit', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let companyServiceStub: Partial<CompanyService>;
  let service: CompanyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      providers: [{ provide: CompanyService, hasValue: companyServiceStub }],
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

  it('should have companies state', () => {
    expect(component.companies).toBeDefined();
  });

  it('should have a state to control appear of search suggestions modal', () => {
    expect(component.searching).toBeDefined();
  });

  it('should get companies on load page', async () => {
    expect(component.companies).toEqual(expectedCompanies);
  });

  it('should have a suggestions state', () => {
    expect(component.suggestions).toBeDefined();
  });

  it('should update searching state on search term is not empty', () => {
    component.onSearch('Company');
    fixture.detectChanges();
    expect(component.searching).toBe(true);
    component.onSearch('');
    expect(component.searching).toBe(false);
  });

  it('should info about a company with the part of name on search suggestions modal', async () => {
    component.onSearch('Company');
    fixture.detectChanges();
    expect(component.suggestions).toEqual(expectedCompanies);
  });

  it('should add suggestion to input on click over suggestion', () => {
    component.onSearch('Company 1');
    fixture.detectChanges();

    const list = fixture.nativeElement.querySelector('.suggestions-list');
    const LIs = list.querySelectorAll('.suggestion');
    LIs[0].dispatchEvent(new Event('click'));
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('.search-input');
    expect(input.value.trim()).toBe(LIs[0].textContent.trim());
  });

  it('should search term on click on submit button', () => {
    const searchInput = fixture.nativeElement.querySelector('.search-input');
    searchInput.value = 'Company 1';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector('.submit-button');
    submitButton.dispatchEvent(new Event('click'));

    service.currentMessage.subscribe((companies) =>
      expect(companies).toEqual([expectedCompanies[0]])
    );
  });

  it('should reset suggestion when search is empty after click on submit button', () => {
    const searchInput = fixture.nativeElement.querySelector('.search-input');
    searchInput.value = 'Company 1';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector('.submit-button');
    submitButton.dispatchEvent(new Event('click'));

    searchInput.value = '';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    submitButton.dispatchEvent(new Event('click'));
    expect(component.suggestions).toEqual([]);
  });
});
