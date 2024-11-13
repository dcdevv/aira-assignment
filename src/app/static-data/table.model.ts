export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

export const ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'H'},
    {position: 2, name: 'Lithium', weight: 6.941, symbol: 'L'},
    {position: 3, name: 'Beryllium', weight: 9.0122, symbol: 'B'},
    {position: 3, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 3, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 4, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 4, name: 'Oxygen', weight: 15.9994, symbol: 'L'},
    {position: 4, name: 'Fluorine', weight: 18.9984, symbol: 'L'},
    {position: 4, name: 'Neon', weight: 20.1797, symbol: 'N'},
];

export class Group {
    public level = 0;
    public parent!: Group;
    public expanded = true;
    public totalCounts = 0;
    public get visible(): boolean {
      return !this.parent || (this.parent.visible && this.parent.expanded);
    }
}

export const CarsData = [
    {
        'groupName':'A',
        'brand':'Fiat1'
    },
    {
        'groupName':'A',
        'brand':'Fiat2'
    },
    {
        'groupName':'B',
        'brand':'Fiat2'
    }
];
