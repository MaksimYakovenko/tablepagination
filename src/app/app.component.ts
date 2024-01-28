import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

@Component({
  // imports: [RouterOutlet, MatTableModule, MatPaginatorModule],
  imports: [
    RouterOutlet
  ],
  selector: 'app-root',
  standalone: true,
  providers: [],
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
})
export class AppComponent {
//   title = 'tablepagination';
//   displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
//   dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//
//   ngAfterViewInit() {
//     this.dataSource.paginator = this.paginator;
//   }
// }
//
// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }
//
// const ELEMENT_DATA: PeriodicElement[] = [];
// for (let i = 1; i <= 2000; i++) {
//   ELEMENT_DATA.push({
//     position: i,
//     name: `Element ${i}`,
//     weight: Math.random() * 100,
//     symbol: `El${i}`,
//   });
}
