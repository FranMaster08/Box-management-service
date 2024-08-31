
import { EstadoCaja } from "./clientes/caja";
import { BoxManagement } from "./managements/BoxManagement";
import { ServiceObservador } from "./observador/generar.observer";

const boxManager = new BoxManagement();

boxManager.crearCaja('BOX1', '192.0.1.12', EstadoCaja.DISPONIBLE);
boxManager.crearCaja('BOX2', '192.0.1.13', EstadoCaja.DISPONIBLE);
boxManager.crearCaja('BOX3', '192.0.1.14', EstadoCaja.DISPONIBLE);

boxManager.cambiarEstadoCaja('BOX1', EstadoCaja.OCUPADO);

boxManager.eliminarCaja('BOX2');

ServiceObservador.notify('cajas-topics', 'Todas las cajas han sido revisadas.');
