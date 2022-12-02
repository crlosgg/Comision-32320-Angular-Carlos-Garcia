import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCustomerHeader]'
})
export class CustomerHeaderDirective implements OnInit {
  constructor(
    private element: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.renderer.setStyle(this.element.nativeElement, 'font-size', '20px');
    this.renderer.setStyle(this.element.nativeElement, 'color', 'black');

  }
}
