import { Caja, EstadoCaja } from "../clientes/caja";
import { ServiceObservador } from "../observador/generar.observer";


export class BoxManagement {
    private cajas: Map<string, Caja> = new Map();

    // Crear una nueva caja y suscribirse al tópico correspondiente
    public crearCaja(id: string, ip: string, estado: EstadoCaja): void {
        if (this.cajas.has(id)) {
            console.warn(`[WARN] La caja con ID ${id} ya existe.`);
            return;
        }

        const nuevaCaja = new Caja(id, ip, estado);
        this.cajas.set(id, nuevaCaja);
        ServiceObservador.subscribe('cajas-topics', nuevaCaja);
        console.log(`[INFO] Caja ${id} creada y suscrita al tópico 'cajas-topics'.`);
    }

    // Eliminar una caja y cancelar su suscripción al tópico correspondiente
    public eliminarCaja(id: string): void {
        const caja = this.cajas.get(id);
        if (!caja) {
            console.warn(`[WARN] La caja con ID ${id} no existe.`);
            return;
        }

        ServiceObservador.unsubscribe('cajas-topics', caja);
        this.cajas.delete(id);
        console.log(`[INFO] Caja ${id} eliminada y desuscrita del tópico 'cajas-topics'.`);
    }

    // Cambiar el estado de una caja y notificar el cambio
    public cambiarEstadoCaja(id: string, nuevoEstado: EstadoCaja): void {
        const caja = this.cajas.get(id);
        if (!caja) {
            console.warn(`[WARN] La caja con ID ${id} no existe.`);
            return;
        }

        caja.cambiarEstado(nuevoEstado);
        ServiceObservador.notify('cajas-topics', `Caja ${id} cambió a estado ${nuevoEstado}.`);
        console.log(`[INFO] Estado de la caja ${id} cambiado a ${nuevoEstado}.`);
    }
}
