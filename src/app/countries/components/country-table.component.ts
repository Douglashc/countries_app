import { Component, Input } from '@angular/core';
import { Country } from '../interfaces/country';

@Component({
    selector: 'countries-country-table',
    templateUrl: './country-table.component.html',
    styleUrls: ['./country-table.component.scss']
})
export class CountryTableComponent {
    
    @Input()
    public countries: Country[] = [];

    constructor () {}
}