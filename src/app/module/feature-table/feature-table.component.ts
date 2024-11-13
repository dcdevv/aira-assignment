import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, CdkDropList, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { NgIf, TitleCasePipe } from '@angular/common';
import { ELEMENT_DATA, Group, PeriodicElement } from '@app/static-data/table.model';

@Component({
  selector: 'app-feature-table',
  standalone: true,
  imports: [
    NgIf,
    CdkDropList,
    MatIcon,
    DragDropModule,
    MatTableModule,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatChipsModule,
    TitleCasePipe
  ],
  templateUrl: './feature-table.component.html',
  styleUrl: './feature-table.component.scss'
})
export class FeatureTableComponent implements OnInit {

  @ViewChild('table') public table!: MatTable<PeriodicElement>;

  public dataSource = new MatTableDataSource<Group>([]);
  public selectedColumns: string[] = [];
  
  protected readonly displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  private readonly _alldata = ELEMENT_DATA;

  public ngOnInit(): void {
    
    this._alldata.forEach((item: PeriodicElement & { id?: number }, index: number) => { item['id'] = index + 1; });

    this.dataSource.data = this.addGroups(this._alldata, this.selectedColumns);
    this.dataSource.filterPredicate = this.customFilterPredicate.bind(this);
    this.dataSource.filter = performance.now().toString();
  }

  public dropHeader(event: CdkDragDrop<string[]>): void {

    console.log('dropHeader - event', event.item.data);
   
    if (!this.selectedColumns.includes(event.item.data)) {
      this.selectedColumns.push(event.item.data);
    }
  }

  public dragHeader(event: string): void {

    console.log('dragHeader - event', event);
   
    if (!this.selectedColumns.includes(event)) {
      this.selectedColumns.push(event);

      this.groupBy(event);
    }
  }
  
  public dropRow(event: CdkDragDrop<string>): void {

    console.log('dropRow - event', event);
    
    const previousIndex = this._alldata.findIndex(d => d === event.item.data);

    moveItemInArray(this._alldata, previousIndex, event.currentIndex);
    this.table.renderRows();
  }

  public removeColumnFromHeader(column: string): void {
    const index = this.selectedColumns.indexOf(column);
    if (index >= 0) {
      this.selectedColumns.splice(index, 1);
      this.unGroupBy(column);
    }
  }

  public noReturnPredicate(): boolean {
    return false;
  }

  public groupHeaderClick(row: any): void {
    row.expanded = !row.expanded;
    this.dataSource.filter = performance.now().toString(); // bug here need to fix
  }

  public groupBy(column: string): void {

    this.checkGroupByColumn(column, true);
    this.dataSource.data = this.addGroups(this._alldata, this.selectedColumns);
    this.dataSource.filter = performance.now().toString();
  }

  public checkGroupByColumn(field: string, add: boolean): void {

    let found = null;

    for (const column of this.selectedColumns) {
      if (column === field) {
        found = this.selectedColumns.indexOf(column, 0);
      }
    }

    if (found != null && found >= 0) {
      if (!add) {
        this.selectedColumns.splice(found, 1);
      }
    }
    else {
      if (add) {
        this.selectedColumns.push(field);
      }
    }
  }

  public unGroupBy(column: string): void {
    this.checkGroupByColumn(column, false);
    this.dataSource.data = this.addGroups(this._alldata, this.selectedColumns);
    this.dataSource.filter = performance.now().toString();
  }

  public customFilterPredicate(data: Group): boolean {
    return data instanceof Group ? data.visible : this.getDataRowVisible(data);
  }

  public getDataRowVisible(data: any): boolean {
    const groupRows = this.dataSource.data.filter(row => {
      if (!(row instanceof Group)) {
        return false;
      }
      let match = true;
      this.selectedColumns.forEach(column => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (!row[column] || !data[column] || row[column] !== data[column]) {
          match = false;
        }
      });

      return match;
    });

    if (groupRows.length === 0) {
      return true;
    }

    const parent = groupRows[0] as Group;

    return parent.visible && parent.expanded;
  }

  public addGroups(data: any[], groupByColumns: string[]): any[] {
    const rootGroup = new Group();
    rootGroup.expanded = true;

    return this.getSublevel(data, 0, groupByColumns, rootGroup);
  }

  public getSublevel(data: any[], level: number, groupByColumns: string[], parent: Group): any[] {

    if (level >= groupByColumns.length) {
      return data;
    }

    const groups = this.uniqueBy(

      data.map(row => {

        const result = new Group();
        result.level = level + 1;
        result.parent = parent;

        for (let i = 0; i <= level; i++) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          result[groupByColumns[i]] = row[groupByColumns[i]];
        }

        return result;
      }),

      JSON.stringify
    );

    const currentColumn: string = groupByColumns[level];

    let subGroups: any[] = [];

    groups.forEach((group: Group) => {
      const rowsInGroup = data.filter( row => group[currentColumn as keyof Group] === row[currentColumn]);
      group.totalCounts = rowsInGroup.length;
      const subGroup = this.getSublevel(rowsInGroup, level + 1, groupByColumns, group);
      subGroup.unshift(group);
      subGroups = subGroups.concat(subGroup);
    });
    
    return subGroups;
  }

  public uniqueBy(a: Group[], key: (item: Group) => string): any {
    
    const seen: Record<string, boolean>  = {};
    
    return a.filter((item: any) => {
      const k = key(item);

      return Object.prototype.hasOwnProperty.call(seen, k) ? false : (seen[k] = true);
    });
  }
  
  public isGroup(index: number, item: any): boolean {

    index;

    return item instanceof Group;
  }
}
