import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'translateHeaders',
  standalone: true
})
export class TranslateHeadersPipe implements PipeTransform {
  transform(columnName: string): string {
    switch (columnName) {
      case 'id':
        return 'Номер';
      case 'name':
        return 'Назва';
      case 'costs':
        return 'Витрати';
      case 'symbol':
        return 'Позначення';
      case 'date':
        return 'Григоріанський день';
      case 'julian':
        return 'Юліанський день';
      case 'agreed':
        return 'Погодження';
      case 'edit':
        return 'Редагування';
      default:
        return columnName
    }
  }
}
