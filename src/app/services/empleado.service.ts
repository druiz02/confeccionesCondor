import { Injectable } from '@angular/core';

// Firebase
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

// Model
import { Empleado } from '../models/empleado';

@Injectable()
export class EmpleadoService {

 empleadoList: AngularFireList<any>;
  selectedEmpleado: Empleado = new Empleado();

  constructor(private firebase: AngularFireDatabase) { }

  getEmpleados()
  {
    return this.empleadoList = this.firebase.list('empleados');
  }

  insertEmpleado(empleado: Empleado)
  {
    this.empleadoList.push({
      tipoDocumento: empleado.tipoDocumento,
      identificacion: empleado.identificacion,
      nombres: empleado.nombres,
      apellidos: empleado.apellidos,
      fechaDeNacimiento: empleado.fechaDeNacimiento,
      area: empleado.area
    });
  }

  updateEmpleado(empleado: Empleado)
  {
    this.empleadoList.update(empleado.$key, {
      tipoDocumento: empleado.tipoDocumento,
      identificacion: empleado.identificacion,
      nombres: empleado.nombres,
      apellidos: empleado.apellidos,
      fechaDeNacimiento: empleado.fechaDeNacimiento,
      area: empleado.area
    });
  }

  deleteEmpleado($key: string)
  {
    this.empleadoList.remove($key);
  }
}
