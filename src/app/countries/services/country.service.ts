import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { Observable, catchError, of, map, tap } from "rxjs";

import { Country } from "../interfaces/country";
import { CacheStore } from "../interfaces/cache-store.interface";
import { Region } from "../interfaces/region.type";

@Injectable({
    providedIn: 'root'
})

export class CountryService {

    private apiUrl: string = 'https://restcountries.com/v3.1';
    
    public cacheStore: CacheStore = {
        byCapital: { term: '', countries: [] },
        byCountries: { term: '', countries: [] },
        byRegion: { region: '', countries: [] }
    }

    constructor(private httpClient: HttpClient) {
        this.loadToLocalStorage();
    }

    saveToLocalStorage() : void {
        localStorage.setItem('cacheStorage', JSON.stringify(this.cacheStore));
    }

    loadToLocalStorage() : void {
        if(!localStorage.getItem('cacheStorage')) return;
        this.cacheStore = JSON.parse(localStorage.getItem('cacheStorage')!);
    }

    getCountriesRequest(url: string) : Observable<Country[]> {
        return this.httpClient.get<Country[]>(url)
            .pipe(
                catchError(() => of([]))
                //delay(2000)
            );
    }
    
    searchCapital(search: string) : Observable<Country[]> {
        return this.getCountriesRequest(`${this.apiUrl}/capital/${search}`)
            .pipe(
                tap(countries => this.cacheStore.byCapital = { term: search, countries: countries }),
                tap(() => this.saveToLocalStorage())
            );
    }

    searchCountry(search: string) : Observable<Country[]> {
        return this.getCountriesRequest(`${this.apiUrl}/name/${search}`)
            .pipe(
                tap(countries => this.cacheStore.byCountries = { term: search, countries: countries }),
                tap(() => this.saveToLocalStorage())
            );
    }

    searchRegion( search: Region ) : Observable<Country[]> {
        return this.getCountriesRequest(`${this.apiUrl}/region/${search}`)
            .pipe(
                tap(countries => this.cacheStore.byRegion = { region: search, countries: countries }),
                tap(() => this.saveToLocalStorage())
            );
    }

    searchCountryByAlphaCode(code: string) : Observable<Country | null> {
        return this.httpClient.get<Country[]>(`${this.apiUrl}/alpha/${code}`)
            .pipe(
                map(countries => countries.length > 0 ? countries[0] : null),
                catchError(() => of(null))
            );
    }
}