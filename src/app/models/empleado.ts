export class Empleado {
    $key: string;
    identificacion: string;
    tipoDocumento: string;
    nombres: string;
    apellidos: string;
    fechaDeNacimiento: string;
    area:string;

    constructor(){
        this.tipoDocumento = "";
    }
}
