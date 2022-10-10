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
    this.renderer.setStyle(this.element.nativeElement, 'color', '#7B1FA2');
    this.renderer.setStyle(this.element.nativeElement, '-moz-text-stroke-color', '#A328D7')
    this.renderer.setStyle(this.element.nativeElement, '-webkit-text-stroke-color', '#A328D7')
    this.renderer.setStyle(this.element.nativeElement, '-moz-text-stroke-width', '0.5px')
    this.renderer.setStyle(this.element.nativeElement, '-webkit-text-stroke-width', '0.5px')

  }
}
