import { Directive } from '@angular/core';

@Directive({
  selector: '[appFilterItem]'
})
export class FilterItemDirective {

  constructor() {
      console.log(1);
  }

}
