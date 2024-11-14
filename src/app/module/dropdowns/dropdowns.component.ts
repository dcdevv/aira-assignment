import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FirstLevelArr, FourthLevelArr, SecondLevelArr, ThirdLevelArr } from '@app/static-data/countries.enum';
import { Place } from '@app/static-data/info.model';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dropdowns',
  standalone: true,
  imports: [
    NgFor,
    MatFormFieldModule,
    MatSelectModule,
    MatGridListModule,
    MatCardModule
  ],
  templateUrl: './dropdowns.component.html',
  styleUrl: './dropdowns.component.scss'
})
export class DropdownsComponent implements OnInit {

  public readonly countries = FirstLevelArr;
  public readonly states = SecondLevelArr;
  public readonly districts = ThirdLevelArr;
  public readonly places = FourthLevelArr;

  public dynamicStateList: Array<Place> = [];
  public dynamicDistrictList: Array<Place> = [];
  public dynamicPlaceList: Array<Place> = [];

  public output!: any;

  public ngOnInit(): void {
    this.output = { countries: {} };  
    this.buildHierarchy();
  }

  public countryChanged(id: string): void {

    // Old way with target data...
    // this.dynamicStateList = this.states.filter((state) => state.parentId === id);

    this.dynamicStateList = [];
    const objectKeys = Object.keys(this.output['countries'][id]['states']);

    for (let index = 1; index < objectKeys.length + 1; index++) {
      const element = this.output['countries'][id]['states'][index];
      this.dynamicStateList.push({ id: `${index}`, name: element?.stateName, parentId: id, child: element?.districts});
    }

    this.dynamicDistrictList = [];
    this.dynamicPlaceList = [];
  }

  public stateChanged(id: string): void {

    // Old way with target data...
    // this.dynamicDistrictList = this.districts.filter((district) => district.parentId === id);

    this.dynamicDistrictList = [];
    const objectKeys = Object.keys(this.dynamicStateList[Number(id)-1]?.child);

    for (let index = 1; index < objectKeys.length + 1; index++) {

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const element = this.dynamicStateList[Number(id) - 1]?.child[index];
      this.dynamicDistrictList.push({ id: `${index}`, name: element?.districtName, parentId: id, child: element?.places});
    }

    this.dynamicPlaceList = [];
  }

  public districtChanged(id: string): void { 
    
    // Old way with target data...
    // this.dynamicPlaceList = this.places.filter((place) => place.parentId === id );

    this.dynamicPlaceList = [];

    const objectKeys = Object.keys(this.dynamicDistrictList[Number(id)-1].child);

    for (let index = 1; index < objectKeys.length + 1; index++) {

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const element = this.dynamicDistrictList[Number(id) - 1]?.child[index];
      this.dynamicPlaceList.push({ id: `${index}`, name: element?.placeName, parentId: id, child: element?.places});
    }
  }

  private buildHierarchy(): void {
    
    this.countries.forEach((country, index) => {

      this.output.countries[`${index + 1}`] = {
        countryName: country.name,
        states: this.mapStates(country.id)
      };
    });
  }

  private mapStates(parentId: string): any {

    return this.states
      .filter(state => state.parentId === parentId)
      .reduce((states: any, state, index) => {
        states[`${index + 1}`] = {
          stateName: state.name,
          districts: this.mapDistricts(state.id)
        };

        return states;
      }, {});
  }

  private mapDistricts(parentId: string): any {

    return this.districts
      .filter(district => district.parentId === parentId)
      .reduce((districts: any, district, index) => {
        districts[`${index + 1}`] = {
          districtName: district.name,
          places: this.mapPlaces(district.id)
        };

        return districts;
      }, {});
  }

  private mapPlaces(parentId: string): any {

    return this.places
      .filter(place => place.parentId === parentId)
      .reduce((places: any, place, index) => {
        places[`${index + 1}`] = { placeName: place.name };

        return places;
      }, {});
  }
}
