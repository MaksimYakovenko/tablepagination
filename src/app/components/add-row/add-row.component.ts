import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatButton} from "@angular/material/button";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from "@angular/material/core";

@Component({
  selector: 'app-add-row',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatSuffix,
    MatDatepicker,
    MatButton,
    MatDialogActions,
    MatLabel,
    MatRadioButton,
    MatRadioGroup
  ],
  templateUrl: './add-row.component.html',
  styleUrl: './add-row.component.css',
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'uk'},
    [provideNativeDateAdapter()]
  ]
})
export class AddRowComponent {
  addForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddRowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.addForm = this.formBuilder.group({
      name: [data.name, Validators.required],
      costs: [data.costs, Validators.required],
      symbol: [data.symbol, Validators.required],
      date: [data.date, Validators.required],
      julian: [data.julian, Validators.required],
      agreed: [data.date, Validators.required]
    });
  }

  onSave(): void {
    if (this.addForm.valid) {
      const addForm = {
        name: this.
      };
    }
  }

}
