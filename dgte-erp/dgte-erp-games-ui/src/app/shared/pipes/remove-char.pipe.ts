import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'removeChar'})
export class RemoveCharPipe implements PipeTransform {
  transform(value: number, length: number): string {
    length = length * -1;
    return value.toString().slice(0, length);
  }
}
