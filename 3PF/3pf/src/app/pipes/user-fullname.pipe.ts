import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userFullname'
})
export class UserFullnamePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {

    let fullName = args[0] + (args[0] != '' ? ' ' + args[1] : '');

    return fullName;
  }

}
