"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    generateCallsWithNamespace(nspObj, nspName) {
        return __awaiter(this, void 0, void 0, function* () {
            let nsp = this.namespaces.get(nspName);
            if (!nsp) {
                nsp = this.io.of(nspName);
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
                    console.log(nspObj);
                    nspObj.constructor[exports.sioEventProp].forEach((event) => {
                        console.log(event);
                        socket.on(event['name'], data => {
                            if (event['middleware'].length) {
                                event['middleware'].foreach((middleware) => __awaiter(this, void 0, void 0, function* () {
                                    let res = yield middleware(data);
                                    if (!res) {
                                        socket.disconnect(true);
                                        return;
                                    }
                                }));
                            }
                            nspObj[event['name']](data, socket);
                        });
                    });
                }
            });
            this.namespaces.set(nspName, nsp);
        });
    }
}
SioController.instance = null;
exports.SioController = SioController;
//# sourceMappingURL=sio-controller.js.map