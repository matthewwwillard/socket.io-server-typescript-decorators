/// <reference types="socket.io" />
export declare const sioEventProp = "__sioEvent";
export declare const sioNamespaceProp = "__sioNamespace";
export interface SioNamespaceOptions {
    name: string;
    middleware?: Array<(socket: SocketIO.Socket, next: () => void) => void>;
    onConnection?: Array<(socket: SocketIO.Socket) => void>;
}
export declare class SioController {
    private static instance;
    private io;
    private isInitialized;
    private ioNamespaceClasses;
    private namespaces;
    static getInstance(): SioController;
    private constructor();
    addIoNamespace(namespaceClass: any): void;
    init(io: SocketIO.Server): void;
    private prepareNamespace(ioNamespaceClass);
}
