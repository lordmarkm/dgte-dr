import { Pipe, PipeTransform } from '@angular/core';
import { READABLE_DATE_FORMAT } from '@los/shared/constants';

const moment = require('moment');

@Pipe({name: 'readableDate'})
export class DateFormatPipe implements PipeTransform {
  transform(date: Date): string {
    return moment(date).format(READABLE_DATE_FORMAT);
  }
}
