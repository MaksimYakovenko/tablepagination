import {AfterViewInit, Component, HostBinding, OnInit, ViewChild} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatPaginator, MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSort, Sort, MatSortModule} from "@angular/material/sort";
import {ColumnResizeDirective} from "./tablepagination.directive";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatIcon} from "@angular/material/icon";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatButton, MatIconButton} from "@angular/material/button";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {OverlayContainer} from "@angular/cdk/overlay";
import {NgIf} from "@angular/common";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatRadioModule} from "@angular/material/radio";
import {CommonModule} from "@angular/common";
import {pipe} from "rxjs";
import {TranslateHeadersPipe} from "./translate-headers.pipe";


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
    CommonModule, TranslateHeadersPipe
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
  column: any;
  displayedColumns: string[] = ['id', 'name', 'costs', 'symbol', 'date', 'agreed', 'edit'];
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

  constructor(private _liveAnnouncer: LiveAnnouncer, private overlay: OverlayContainer) {
    super();
  }

  toggleControl = new FormControl(false);
  @HostBinding('class') className = '';
  darkClassName = 'theme-dark';
  lightClassName = 'theme-light';

  ngOnInit() {
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      this.className = darkMode ? this.darkClassName : this.lightClassName;
      if (darkMode) {
        this.overlay.getContainerElement().classList.add(this.darkClassName);
      } else {
        this.overlay.getContainerElement().classList.remove(this.darkClassName);
      }
    })
  }

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  editElement(element: any) {
    this.originalElements[element.id] = {...element};
    element.isEdit = true;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
  }

  toggleEditMode(element: any, field: string) {
    element.isEdit = field;
  }


  onEdit(item: any) {
    item.editFieldName = item;
}

  updateAgreedStatus(event: any, element: PeriodicElement) {
    element.agreed = event.value;
  }

  cancelEdit(element: any) {
    const originalElement = this.originalElements[element.id];
    Object.assign(element, originalElement);
    element.isEdit = false;
  }

  save(item: any) {
    item.editFieldName = '';
  }

  close(element: any) {
    if (!element.saved) {
      element.editFieldName = element.originalValue;
    }
    element.isEdit = false;
  }


  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce('Sorted ${sortState.direction}ending');
      console.log(this._liveAnnouncer)
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  protected readonly pipe = pipe;
}

export interface PeriodicElement {
  name: string;
  id: number;
  costs: number;
  symbol: string;
  date: string;
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
    name: `Element ${i}`,
    costs: Math.random() * 100,
    symbol: `El${i}`,
    date: formattedDate,
    agreed: agreedStatus,
    isEdit: false,
    editFieldName: '',
  });
}
