/// <reference types="socket.io" />
export declare const sioEventProp = "__sioEvent";
export declare const sioNamespaceProp = "__sioNamespace";
export declare const sioRegisterConnection = "__sioConnection";
export interface SioNamespaceOptions {
    name: string | Array<string>;
    middleware?: Array<(socket: SocketIO.Socket, next: () => void) => void>;
    onConnection?: Array<(socket: SocketIO.Socket) => void>;
}
export declare class SioController {
    private static instance;
    private io;
    private isInitialized;
    private ioNamespaceClasses;
    private ioConnectionClasses;
    private namespaces;
    static getInstance(): SioController;
    private constructor();
    rootSocketServer(): SocketIO.Server;
    addIoNamespace(namespaceClass: any): void;
    addConnectionListener(className: any): void;
    init(io: SocketIO.Server): void;
    private prepareNamespace(ioNamespaceClass);
}
