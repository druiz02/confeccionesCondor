import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

//  Service 
import { EmpleadoService } from '../../../services/empleado.service';

// Class
import { Empleado } from '../../../models/empleado';

// toastr
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {
  myForm: FormGroup;
  constructor(
    private empleadoService: EmpleadoService,
    private toastr: ToastrService,
    public fb: FormBuilder,
  ) {
    this.myForm = this.fb.group({
      nombres: ["", Validators.required]
    });
   }

  ngOnInit() {
    this.empleadoService.getEmpleados();
    this.resetForm();
  }

  onSubmit(empleadoForm: NgForm)
  {
    if(empleadoForm.value.$key == null)
      this.empleadoService.insertEmpleado(empleadoForm.value);
    else
    this.empleadoService.updateEmpleado(empleadoForm.value);
    
    this.resetForm(empleadoForm);
    this.toastr.success('Operación exitosa', 'empleado registrado');
  }

  resetForm(empleadoForm?: NgForm)
  {
    if(empleadoForm != null)
    empleadoForm.reset();
      this.empleadoService.selectedEmpleado = new Empleado();
  }

}
