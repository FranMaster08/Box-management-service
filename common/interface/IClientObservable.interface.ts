export interface IClientObservable {
    execute(message: string): Promise<void>
}