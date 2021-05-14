import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesListComponent } from './companies-list.component';
import { CompanyService, Company } from '../company.service';
import expectedCompanies from '../../assets/mocks/companies';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CompaniesListComponent Unit', () => {
  let component: CompaniesListComponent;
  let fixture: ComponentFixture<CompaniesListComponent>;
  let service: CompanyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CompaniesListComponent],
      providers: [CompanyService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniesListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(CompanyService);
    fixture.detectChanges();
  });

  it('should have a suggestions state', () => {
    expect(component.suggestions).toBeDefined();
  });

  it('should have a display about company id state', () => {
    expect(component.displayAboutCompanyId).toBeDefined();
  });

  it('should change display about company id state on click over a company', () => {
    component.suggestions = expectedCompanies;
    fixture.detectChanges();

    const list = fixture.nativeElement.querySelector('.full-list');
    const companies = list.querySelectorAll('.company');
    const company1 = companies[0]?.querySelector('.info');

    company1.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(company1.displayAboutCompanyId).toBe(1);

    company1.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(company1.displayAboutCompanyId).toBe(0);

    const company2 = companies[1]?.querySelector('.info');

    company2.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(company2.displayAboutCompanyId).toBe(2);

    company1.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(company2.displayAboutCompanyId).toBe(1);
  });
});
