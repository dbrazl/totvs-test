import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CompanyService } from './company.service';

import expectedCompanies from '../assets/mocks/companies';

describe('CompanyService Integration', () => {
  let injector: TestBed;
  let service: CompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CompanyService],
    });
    injector = getTestBed();
    service = injector.get(CompanyService);
  });

  it('should return an Observable<Company[]>', async () => {
    spyOn(service, 'getCompanies').and.returnValue(
      Promise.resolve(expectedCompanies)
    );
    const companies = await service.getCompanies();
    expect(companies.length).toBe(2);
    expect(companies).toEqual(expectedCompanies);
  });
});
