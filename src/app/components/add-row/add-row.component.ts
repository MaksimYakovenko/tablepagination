import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_DATE_LOCALE, MatNativeDateModule, provideNativeDateAdapter} from "@angular/material/core";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatInput} from "@angular/material/input";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatButton} from "@angular/material/button";
import {JuliancalendarService} from "../../tablepagination/juliancalendar.service";


@Component({
  selector: 'app-add-row',
  templateUrl: './add-row.component.html',
  styleUrls: ['./add-row.component.css'],
  standalone: true,
  imports: [
    MatDialogContent,
    MatFormField,
    MatLabel,
    MatRadioGroup,
    MatRadioButton,
    MatDialogActions,
    MatDialogClose,
    MatInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    ReactiveFormsModule,
    MatDialogTitle,
    MatButton,
    MatNativeDateModule,
    MatSuffix
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'uk'},
    [provideNativeDateAdapter()]
  ]
})
export class AddRowComponent implements OnInit {
  addForm!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddRowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private julianCalendarService: JuliancalendarService,
  ) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      name: [this.data?.name || '', Validators.required],
      costs: [this.data?.costs || '', Validators.required],
      symbol: [this.data?.symbol || '', Validators.required],
      date: [this.data?.date || '', Validators.required],
      julian: [this.data?.julian || '', Validators.required],
      agreed: [this.data?.agreed || '', Validators.required]
    });
  }

  updateJulianDate(): void {
    const selectedDate = this.addForm.value.date;
    if (selectedDate) {
      const julianDate = this.julianCalendarService.toJulianDate(selectedDate);
      this.addForm.patchValue({julian: julianDate});
    }
  }

  onSave(): void {
    if (this.addForm.valid) {
      const addData = {
        name: this.addForm.value.name,
        costs: this.addForm.value.costs,
        symbol: this.addForm.value.symbol,
        date: this.addForm.value.date,
        julian: this.addForm.value.julian,
        agreed: this.addForm.value.agreed
      };
      this.dialogRef.close(addData);
    }
  }
}
