import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

type Company = {
  id: number;
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

  private messageSource = new BehaviorSubject(<Company[]>[]);
  currentMessage = this.messageSource.asObservable();

  constructor(private httpClient: HttpClient) {}

  setSuggestions(suggestions: Company[]): void {
    this.messageSource.next(suggestions);
  }

  getCompanies(): Promise<Company[]> {
    return this.httpClient.get<Company[]>(this.API_URL).toPromise();
  }
}

export { Company };
