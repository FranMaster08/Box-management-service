Aquí tienes un ejemplo de un archivo `README.md` para tu proyecto:

---

# BoxManagement System

Este proyecto implementa un sistema de gestión de cajas (BoxManagement) utilizando un patrón observador para manejar las notificaciones de cambios de estado de las cajas.

## Descripción

El sistema permite la creación, eliminación y cambio de estado de cajas. Cada caja se suscribe a un tópico donde recibe notificaciones sobre eventos relevantes, como cambios de estado u otras acciones.

### Características principales

- **Crear cajas**: Añade nuevas cajas al sistema y las suscribe a un tópico de notificaciones.
- **Eliminar cajas**: Elimina cajas existentes y las desuscribe del tópico de notificaciones.
- **Cambiar estado de las cajas**: Actualiza el estado de una caja y notifica a todos los suscriptores sobre el cambio.
- **Patrón Observador**: Implementación del patrón observador para gestionar las suscripciones y notificaciones de las cajas.

## Estructura del Proyecto

- `BoxManagement.ts`: Clase que gestiona la creación, eliminación y cambio de estado de las cajas.
- `Caja.ts`: Clase que representa una caja, con su estado y funcionalidad para recibir notificaciones.
- `ServiceObservador.ts`: Servicio que implementa el patrón observador para gestionar las suscripciones y notificaciones de las cajas.
- `EstadoCaja.ts`: Enumerado que define los diferentes estados que una caja puede tener.

## Instalación

1. Clona el repositorio:

    ```bash
    git clone https://github.com/tu-usuario/box-management-system.git
    cd box-management-system
    ```

2. Instala las dependencias necesarias (si es que las hay):

    ```bash
    npm install
    ```

## Uso

Aquí tienes un ejemplo de cómo utilizar el sistema de gestión de cajas:

```typescript
import { BoxManagement } from "./BoxManagement";
import { EstadoCaja } from "./clientes/caja";

const boxManager = new BoxManagement();

// Crear nuevas cajas
boxManager.crearCaja('BOX1', '192.0.1.12', EstadoCaja.DISPONIBLE);
boxManager.crearCaja('BOX2', '192.0.1.13', EstadoCaja.DISPONIBLE);
boxManager.crearCaja('BOX3', '192.0.1.14', EstadoCaja.DISPONIBLE);

// Cambiar el estado de una caja
boxManager.cambiarEstadoCaja('BOX1', EstadoCaja.OCUPADO);

// Eliminar una caja
boxManager.eliminarCaja('BOX2');

// Notificar a todas las cajas
ServiceObservador.notify('cajas-topics', 'Todas las cajas han sido revisadas.');
```

### Métodos disponibles en `BoxManagement`

- **crearCaja(id: string, ip: string, estado: EstadoCaja)**: Crea una nueva caja y la suscribe al tópico de notificaciones.
- **eliminarCaja(id: string)**: Elimina una caja existente y la desuscribe del tópico de notificaciones.
- **cambiarEstadoCaja(id: string, nuevoEstado: EstadoCaja)**: Cambia el estado de una caja y notifica el cambio a todos los suscriptores.

## Contribuciones

Las contribuciones son bienvenidas. Puedes crear un pull request o abrir un issue para discutir los cambios que te gustaría hacer.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.

