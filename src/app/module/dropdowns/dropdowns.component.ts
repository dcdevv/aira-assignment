import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FirstLevelArr, FourthLevelArr, SecondLevelArr, ThirdLevelArr } from '@app/static-data/countries.enum';
import { Place } from '@app/static-data/info.model';
import { MatGridListModule } from '@angular/material/grid-list';


@Component({
  selector: 'app-dropdowns',
  standalone: true,
  imports: [
    NgFor,
    MatFormFieldModule,
    MatSelectModule,
    MatGridListModule
  ],
  templateUrl: './dropdowns.component.html',
  styleUrl: './dropdowns.component.scss'
})
export class DropdownsComponent {

  public readonly countries = FirstLevelArr;
  public readonly states = SecondLevelArr;
  public readonly districts = ThirdLevelArr;
  public readonly places = FourthLevelArr;

  public dynamicStateList: Array<Place> = [];
  public dynamicDistrictList: Array<Place> = [];
  public dynamicPlaceList: Array<Place> = [];

  public countryChanged(id: string): void {

    this.dynamicStateList = this.states.filter((state) => state.parentId === id);
    this.dynamicDistrictList = [];
    this.dynamicPlaceList = [];
  }

  public stateChanged(id: string): void {
    this.dynamicDistrictList = this.districts.filter((district) => district.parentId === id);

    //when state changes dependent place dropdown is resetted
    this.dynamicPlaceList = [];
  }

  public districtChanged(id: string): void {
    this.dynamicPlaceList = this.places.filter((place) => place.parentId === id );
  }

}
