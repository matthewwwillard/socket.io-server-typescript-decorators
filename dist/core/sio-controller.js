"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sioEventProp = '__sioEvent';
exports.sioNamespaceProp = '__sioNamespace';
exports.sioRegisterConnection = '__sioConnection';
class SioController {
    constructor() {
        this.isInitialized = false;
        this.ioNamespaceClasses = [];
        this.ioConnectionClasses = [];
        this.namespaces = new Map();
    }
    static getInstance() {
        return this.instance || (this.instance = new this());
    }
    rootSocketServer() {
        return this.io;
    }
    addIoNamespace(namespaceClass) {
        if (this.isInitialized) {
            throw new Error('SioNamespace can not be added after SioController initialization.');
        }
        this.ioNamespaceClasses.push(namespaceClass);
    }
    addConnectionListener(className) {
        if (this.isInitialized) {
            throw new Error('SioNamespace can not be added after SioController initialization.');
        }
        this.ioConnectionClasses.push(className);
    }
    init(io) {
        if (this.isInitialized) {
            throw new Error('SioController can be initialized only once.');
        }
        this.io = io;
        this.ioNamespaceClasses.forEach(nspClass => {
            this.prepareNamespace(nspClass);
        });
        this.isInitialized = true;
    }
    prepareNamespace(ioNamespaceClass) {
        const nspObj = new ioNamespaceClass();
        const nspName = nspObj.constructor[exports.sioNamespaceProp].name;
        if (Array.isArray(nspName)) {
            nspName.forEach(name => {
                this.generateCallsWithNamespace(nspObj, name);
            });
        }
        else {
            this.generateCallsWithNamespace(nspObj, nspName);
        }
    }
    generateCallsWithNamespace(nspObj, nspName) {
        let nsp = this.namespaces.get(nspName);
        if (!nsp) {
            nsp = this.io.of(nspObj.constructor[exports.sioNamespaceProp].name);
        }
        if (nspObj.constructor[exports.sioNamespaceProp].middleware) {
            nspObj.constructor[exports.sioNamespaceProp].middleware.forEach(cb => {
                nsp.use(cb);
            });
        }
        nsp.on('connection', (socket) => {
            const onConnectionCbs = nspObj.constructor[exports.sioNamespaceProp].onConnection;
            if (onConnectionCbs) {
                onConnectionCbs.forEach(cb => {
                    cb(socket);
                });
            }
            if (nspObj.constructor[exports.sioEventProp]) {
                nspObj.constructor[exports.sioEventProp].forEach((event) => {
                    socket.on(event, data => {
                        nspObj[event](data, socket);
                    });
                });
            }
        });
        this.namespaces.set(nspName, nsp);
    }
}
SioController.instance = null;
exports.SioController = SioController;
//# sourceMappingURL=sio-controller.js.map