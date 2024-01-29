import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatPaginator, MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {ColumnResizeDirective} from "./tablepagination.directive";



@Component({
  selector: 'app-tablepagination',
  standalone: true,
  imports: [RouterOutlet, MatTableModule, MatPaginatorModule, ColumnResizeDirective
  ],
  templateUrl: './tablepagination.component.html',
  styleUrl: './tablepagination.component.css',
  providers: [
    {provide: MatPaginatorIntl, useClass: TablepaginationComponent}
  ],
})


export class TablepaginationComponent extends MatPaginatorIntl implements AfterViewInit {
  title = 'tablepagination';
  displayedColumns: string[] = ['id', 'name', 'costs', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  override itemsPerPageLabel = 'Заяв на сторінці';
  override firstPageLabel = 'Перша сторінка';
  override lastPageLabel = 'Остання сторінка';
  override nextPageLabel = 'Наступна сторінка';
  override previousPageLabel = 'Минула сторінка';
  override getRangeLabel = (page: number, pageSize: number, length: number): string => {
    const startIndex = page * pageSize + 1;
    const endIndex = Math.min((page + 1) * pageSize, length);
    return `Сторінка № ${page + 1}, рядки: ${startIndex} - ${endIndex} з ${length}`;
  }
  constructor() {
    super();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
export interface PeriodicElement {
  name: string;
  id: number;
  costs: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];
for (let i = 1; i <= 2000; i++) {
  ELEMENT_DATA.push({
    id: i,
    name: `Element ${i}`,
    costs: Math.random() * 100,
    symbol: `El${i}`,
  });
}

