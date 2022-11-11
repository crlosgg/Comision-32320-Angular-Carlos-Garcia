import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { ModalComponent } from "./modal.component";

describe("ModalComponent", () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ ReactiveFormsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} } 
    ]
    }).compileComponents();


    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    TestBed.inject(FormBuilder);
    fixture.detectChanges();

  });

  describe('Pruebas unitarias 3PF - Componente', () => {

    it('Componente Creado ...', () => {
      expect(component).toBeTruthy();
    });
  

  it('El formulario pasa a valido cuando ingreso los datos requeridos', () => {
    const form = component.courseForm;
    const name = form.controls['name'];
    const category = form.controls['category'];

    name.setValue('Phyton');
    category.setValue('Backend');

    expect(form.valid).toBeTrue();
  })


  it('El input name inicia vacio', () => {
    const form = component.courseForm;
    const name = form.controls['name'];
     expect(name.value).toEqual('');
  })

  it('El input category inicia vacio', () => {
    const form = component.courseForm;
    const name = form.controls['name'];
     expect(name.value).toEqual('');
  })

});

})