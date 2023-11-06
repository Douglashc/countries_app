import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit {

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = ''

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    this.countries = this.countryService.cacheStore.byCountries.countries;
    this.initialValue = this.countryService.cacheStore.byCountries.term;
  }

  searchByCapital(term: string) : void {

    this.isLoading = true;
    this.countryService.searchCountry(term).subscribe(
      res => {
        console.log(res);
        this.countries = res;
        this.isLoading = false;
      },
      err => console.log(err)
    );
  }
}
