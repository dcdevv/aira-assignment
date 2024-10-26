import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FirstLevelArr, FourthLevelArr, SecondLevelArr, ThirdLevelArr } from '@app/static-data/countries.enum';

@Component({
  selector: 'app-tree-structure',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './tree-structure.component.html',
  styleUrl: './tree-structure.component.scss'
})
export class TreeStructureComponent implements OnInit {

  public readonly countries = FirstLevelArr;
  public readonly states = SecondLevelArr;
  public readonly districts = ThirdLevelArr;
  public readonly places = FourthLevelArr;

  public output!: any;

  public ngOnInit(): void {

    this.output = {
      countries: {}
    };

    this.buildHierarchy();
  }

  public buildHierarchy(): void {
    
    this.countries.forEach((country, index) => {

      this.output.countries[`0${index + 1}`] = {
        countryName: country.name,
        states: this.mapStates(country.id)
      };
    });
  }

  public mapStates(parentId: string): any {

    return this.states
      .filter(state => state.parentId === parentId)
      .reduce((states: any, state, index) => {
        states[`s${index + 1}`] = {
          stateName: state.name,
          districts: this.mapDistricts(state.id)
        };

        return states;
      }, {});
  }

  public mapDistricts(parentId: string): any {

    return this.districts
      .filter(district => district.parentId === parentId)
      .reduce((districts: any, district, index) => {
        districts[`d${index + 1}`] = {
          districtName: district.name,
          places: this.mapPlaces(district.id)
        };

        return districts;
      }, {});
  }

  public mapPlaces(parentId: string): any {

    return this.places
      .filter(place => place.parentId === parentId)
      .reduce((places: any, place, index) => {
        places[`p${index + 1}`] = { placeName: place.name };

        return places;
      }, {});
  }
}
