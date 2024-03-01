import {AfterViewInit, Component, HostBinding, inject, OnInit, ViewChild} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatPaginator, MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSort, Sort, MatSortModule} from "@angular/material/sort";
import {ColumnResizeDirective} from "./tablepagination.directive";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatIcon} from "@angular/material/icon";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatButton, MatIconButton} from "@angular/material/button";
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {OverlayContainer} from "@angular/cdk/overlay";
import {NgIf} from "@angular/common";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MAT_DATE_LOCALE, MatOption, provideNativeDateAdapter} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatRadioModule} from "@angular/material/radio";
import {CommonModule} from "@angular/common";
import {TranslateHeadersPipe} from "./translate-headers.pipe";
import {MatSelect} from "@angular/material/select";
import {JuliancalendarService} from "./juliancalendar.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteRowComponent} from "../components/delete-row/delete-row.component";
import {EditRowComponent} from "../components/edit-row/edit-row.component";
import {AddRowComponent} from "../components/add-row/add-row.component";

@Component({
  selector: 'app-tablepagination',
  standalone: true,
  imports: [RouterOutlet,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    ColumnResizeDirective,
    MatIcon,
    MatSlideToggle,
    MatIconButton,
    MatButton,
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    CommonModule,
    TranslateHeadersPipe,
    MatSelect,
    MatOption
  ],
  templateUrl: './tablepagination.component.html',
  styleUrl: './tablepagination.component.css',
  providers: [
    {provide: MatPaginatorIntl, useClass: TablepaginationComponent},
    {provide: MAT_DATE_LOCALE, useValue: 'uk'},
    [provideNativeDateAdapter()],
  ],
})


export class TablepaginationComponent extends MatPaginatorIntl implements AfterViewInit, OnInit {
  title = 'tablepagination';
  originalElements: any[] = [];
  element: any;
  updatedName: string;
  startDate!: Date;
  endDate!: Date;
  displayedColumns: string[] = ['id', 'name', 'costs', 'symbol', 'date', 'julian', 'agreed', 'edit'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  filteredDataSource = new MatTableDataSource<PeriodicElement>();

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

  constructor(private _liveAnnouncer: LiveAnnouncer, private overlay: OverlayContainer, private julianDateService: JuliancalendarService, private dialog: MatDialog) {
    super();
    this.updatedName = '';
  }

  toggleControl = new FormControl(false);
  @HostBinding('class') className = '';
  darkClassName = 'theme-dark';
  lightClassName = 'theme-light';

  ngOnInit() {
    this.dataSource.data.forEach(element => {
      element.julian = this.julianDateService.toJulianDate(element.date);
    });
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      this.className = darkMode ? this.darkClassName : this.lightClassName;
      if (darkMode) {
        this.overlay.getContainerElement().classList.add(this.darkClassName);
      } else {
        this.overlay.getContainerElement().classList.remove(this.darkClassName);
      }
    })
  this.filteredDataSource = this.dataSource;
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<PeriodicElement>

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.filteredDataSource.sort = this.sort;
  }


  // editElement(element: any) {
  //   this.originalElements[element.id] = {...element};
  //   element.isEdit = true;
  //
  // }

  applyInputFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredDataSource.filter = filterValue.trim().toLowerCase();
    this.applyFilters();
  }

  applySelectFilter(filterValue: string) {
    if (filterValue === 'all') {
      this.filteredDataSource = this.dataSource;
    } else {
      const filteredData = this.dataSource.data.filter(item =>
        item.agreed.toLowerCase() === filterValue.toLowerCase()
      );
      this.filteredDataSource = new MatTableDataSource(filteredData);
    }
    // this.dataSource = this.filteredDataSource;
    this.applyFilters();
  }

  applyDateRangeFilter(startDate: Date, endDate: Date) {
    if (!startDate || !endDate) {
      return;
    }
    const filteredData = this.dataSource.data.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= startDate && itemDate <= endDate;
    });
    this.filteredDataSource = new MatTableDataSource(filteredData);
    this.dataSource = this.filteredDataSource;
    this.applyFilters();
  }

  removeRow(element: any) {
    const dialogRef = this.dialog.open(DeleteRowComponent, {
      data: {name: element.name}
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        const index = this.dataSource.data.indexOf(element);
        if (index > -1) {
          this.dataSource.data.splice(index, 1);
          this.filteredDataSource = new MatTableDataSource(this.dataSource.data);
          this.applyFilters();
        }
      }
    });
  }

  openEditDialog(row: any): void {
    const dialogRef = this.dialog.open(EditRowComponent, {
      width: '450px',
      data: {
        name: row.name,
        costs: row.costs,
        symbol: row.symbol,
        date: row.date,
        agreed: row.agreed}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.name) {
          row.name = result.name;
        }
        if (result.costs) {
          row.costs = result.costs;
        }
        if (result.symbol) {
          row.symbol = result.symbol;
        }
        if (result.date) {
          row.date = result.date;
        }
        if (result.agreed) {
          row.agreed = result.agreed;
        }
      }
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddRowComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data.push(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  applyFilters() {
    this.filteredDataSource.paginator = this.paginator;
    this.filteredDataSource.sort = this.sort;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
  }

  toggleEditMode(item: any, field: string) {
    item.editFieldName = field;
  }

  cancelEdit(element: any) {
    const originalElement = this.originalElements[element.id];
    Object.assign(element, originalElement);
    element.isEdit = false;
  }

  save(element: any) {
    if (!element.saved) {
      element.editFieldName = element.originalValue;
    }
    element.isEdit = false;
    element.isChanged = true;
  }

  close(element: any) {
    if (!element.saved) {
      element.editFieldName = element.originalValue;
    }
    element.isEdit = false;
    element.isChanged = false;
  }


  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce('Sorted ${sortState.direction}ending');
      console.log(this._liveAnnouncer)
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


}

export interface PeriodicElement {
  name: string;
  id: number;
  costs: number;
  symbol: string;
  date: string;
  julian: string;
  agreed: string;
  isEdit: false;
  editFieldName: '';
}

const ELEMENT_DATA: PeriodicElement[] = [];
for (let i = 1; i <= 2000; i++) {
  const randomDate = new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365 * 10));
  const formattedDate = randomDate.toISOString().slice(0, 10);
  const agreedStatus = Math.random() > 0.5 ? 'Погоджено' : 'Не погоджено';
  ELEMENT_DATA.push({
    id: i,
    name: `Заява №${i}`,
    costs: Math.random() * 100,
    symbol: `Заяв${i}`,
    date: formattedDate,
    julian: formattedDate,
    agreed: agreedStatus,
    isEdit: false,
    editFieldName: '',
  });
}
