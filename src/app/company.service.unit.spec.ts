import { TestBed } from '@angular/core/testing';

import { CompanyService } from './company.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import expectedCompanies from '../assets/mocks/companies';

describe('CompanyService Unit', () => {
  let service: CompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have API URL', () => {
    expect(service.API_URL).toBeDefined();
  });
});
