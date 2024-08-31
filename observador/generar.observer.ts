import { IClientObservable } from "../common/interface/IClientObservable.interface";

export class ServiceObservador {
    private static sucriptors: Record<string, IClientObservable[]> = {};

    constructor() {}

    private static colorLog(level: string, message: string): void {
        const reset = "\x1b[0m";
        const colors :  Record<string, string> = {
            DEBUG: "\x1b[36m", // Cyan
            INFO: "\x1b[32m", // Green
            WARN: "\x1b[33m", // Yellow
        };

        console.log(`${colors[level] || reset}[${level}] ${message}${reset}`);
    }

    public static subscribe(topic: string, subject: IClientObservable): void {
        if (!this.sucriptors[topic]) {
            this.sucriptors[topic] = [subject];
            this.colorLog("DEBUG", `Nuevo tópico creado: ${topic}. Suscriptor añadido.`);
        } else {
            this.sucriptors[topic].push(subject);
            this.colorLog("DEBUG", `Suscriptor añadido al tópico existente: ${topic}.`);
        }

        this.colorLog("INFO", `Número total de suscriptores en el tópico '${topic}': ${this.sucriptors[topic].length}`);
    }

    public static getSubscribers(topic: string): IClientObservable[] | undefined {
        const subscribers = this.sucriptors[topic];
        if (subscribers) {
            this.colorLog("DEBUG", `Se obtuvieron suscriptores para el tópico: ${topic}. Total: ${subscribers.length}`);
        } else {
            this.colorLog("WARN", `No se encontraron suscriptores para el tópico: ${topic}`);
        }
        return subscribers;
    }

    public static unsubscribe(topic: string, subject: IClientObservable): void {
        if (this.sucriptors[topic]) {
            const initialLength = this.sucriptors[topic].length;
            this.sucriptors[topic] = this.sucriptors[topic].filter(subscriber => subscriber !== subject);

            if (this.sucriptors[topic].length === 0) {
                delete this.sucriptors[topic];
                this.colorLog("DEBUG", `Tópico '${topic}' eliminado porque no quedan suscriptores.`);
            } else {
                this.colorLog("DEBUG", `Suscriptor eliminado del tópico '${topic}'. Total restante: ${this.sucriptors[topic].length}`);
            }

            this.colorLog("INFO", `Se eliminaron ${initialLength - this.sucriptors[topic].length} suscriptores del tópico '${topic}'`);
        } else {
            this.colorLog("WARN", `Intento de eliminar un suscriptor de un tópico inexistente: ${topic}`);
        }
    }

    public static notify(topic: string, message: any): void {
        if (this.sucriptors[topic]) {
            this.colorLog("INFO", `Notificando a ${this.sucriptors[topic].length} suscriptores en el tópico '${topic}'.`);
            this.sucriptors[topic].forEach(subscriber => {
                subscriber.execute(message);
                this.colorLog("DEBUG", `Suscriptor notificado en el tópico '${topic}'`);
            });
        } else {
            this.colorLog("WARN", `No se puede notificar, no hay suscriptores en el tópico: ${topic}`);
        }
    }
}
