import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'govIdNumber'})
export class GovIdNumberPipe implements PipeTransform {
  transform(value: string, type: string): string {
    if (type === 'SSS') {
      const v = value.split('');
      return `${v[0]}${v[1]}-${v[2]}${v[3]}${v[4]}${v[5]}-${v[6]}${v[7]}${v[8]}-${v[9]}`;
    } else if (type === 'TIN') {
      const v = value.split('');
      return `${v[0]}${v[1]}${v[2]}-${v[3]}${v[4]}${v[5]}-${v[6]}${v[7]}${v[8]}-${v[9]}${v[10]}${v[11]}`;
    }

    return value;
  }
}
