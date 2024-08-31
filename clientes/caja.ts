import { IClientObservable } from "../common/interface/IClientObservable.interface";

export enum EstadoCaja {
    DISPONIBLE = "DISPONIBLE",
    OCUPADO = "OCUPADO",
    MANTENIMIENTO = "MANTENIMIENTO",
    FUERA_SERVICIO = "FUERA_SERVICIO",
}

export class Caja implements IClientObservable {
    constructor(public id: string, public ip: string, public estado: EstadoCaja) {}

    public cambiarEstado(nuevoEstado: EstadoCaja): void {
        this.estado = nuevoEstado;
        console.log(`[INFO] Caja ${this.id} cambió su estado a ${nuevoEstado}.`);
    }

    public async execute(message: string): Promise<void> {
        console.log(`[INFO] Caja ${this.id} recibió mensaje: ${message}`);
    }
}
