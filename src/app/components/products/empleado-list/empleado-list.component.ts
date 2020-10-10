import { Component, OnInit } from '@angular/core';

// model
import { Empleado } from '../../../models/empleado';

// service
import { EmpleadoService } from '../../../services/empleado.service';

// toastr
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-empleado-list',
  templateUrl: './empleado-list.component.html',
  styleUrls: ['./empleado-list.component.css']
})
export class EmpleadoListComponent implements OnInit {
  empleadoList: Empleado[];

  constructor(
    private empleadoService: EmpleadoService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    return this.empleadoService.getEmpleados()
      .snapshotChanges().subscribe(item => {
        this.empleadoList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.empleadoList.push(x as Empleado);
        });
      });
  }

  onEdit(empleado: Empleado) {
    this.empleadoService.selectedEmpleado = Object.assign({}, empleado);
  }

  onDelete($key: string) {
    if(confirm('¿Estas seguro que deseas eliminar este registro?')) {
      this.empleadoService.deleteEmpleado($key);
      this.toastr.warning('Borrado exitoso', 'Empleado removido');
    }
  }

}
