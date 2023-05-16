import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone',
})
export class PhonePipe implements PipeTransform {
  transform(rawNum: string) {
    const areaCodeStr = rawNum.slice(0, 2);
    const midSectionStr = rawNum.slice(2, 7);
    const lastSectionStr = rawNum.slice(7);

    return `(${areaCodeStr}) ${midSectionStr}-${lastSectionStr}`;
  }
}
