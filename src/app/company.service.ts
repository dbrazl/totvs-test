import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

type Company = {
  shortName: string;
  longName: string;
  logo: string;
  description: string;
};

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  readonly API_URL = 'assets/data/companies.json';

  constructor(private httpClient: HttpClient) {}

  getCompanies() {
    return this.httpClient.get<Company[]>(this.API_URL).toPromise();
  }
}

export { Company };
