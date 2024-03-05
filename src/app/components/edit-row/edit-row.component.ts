import {Component, Inject} from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogTitle, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {FormGroup, FormBuilder, FormsModule, Validators} from "@angular/forms";
import {MatInput, MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle, MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelect} from "@angular/material/select";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatNativeDateModule, provideNativeDateAdapter} from "@angular/material/core";
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {NgClass} from "@angular/common";
import {JuliancalendarService} from "../../tablepagination/juliancalendar.service";


@Component({
  selector: 'app-edit-row',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatFormField,
    MatInput,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerModule,
    MatSelect,
    MatRadioGroup,
    MatRadioButton,
    MatNativeDateModule,
    NgClass
  ],
  templateUrl: './edit-row.component.html',
  styleUrl: './edit-row.component.css',
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'uk'},
    [provideNativeDateAdapter()],
  ],
})
export class EditRowComponent {
  editForm: FormGroup;
  editedRow: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<EditRowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private julianCalendarService: JuliancalendarService,
  ) {
    this.editForm = this.formBuilder.group({
      name: [data.name, Validators.required],
      costs: [data.costs, Validators.required],
      symbol: [data.symbol, Validators.required],
      date: [data.date, Validators.required],
      julian: [data.julian, Validators.required],
      agreed: [data.agreed, Validators.required]
    });
  }

  updateJulianDate(): void {
    const selectedDate = this.editForm.value.date;
    if (selectedDate) {
      const julianDate = this.julianCalendarService.toJulianDate(selectedDate);
      this.editForm.patchValue({ julian: julianDate });
    }
  }

  onSave(): void {
    if (this.editForm.valid) {
      const editedData = {
        name: this.editForm.value.name,
        costs: this.editForm.value.costs,
        symbol: this.editForm.value.symbol,
        date: this.editForm.value.date,
        julian: this.editForm.value.julian,
        agreed: this.editForm.value.agreed
      };
      this.dialogRef.close(editedData);
      this.editedRow = true;
    }
  }
}
