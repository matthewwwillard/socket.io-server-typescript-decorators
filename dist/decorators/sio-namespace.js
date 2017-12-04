"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sio_controller_1 = require("../core/sio-controller");
function SioNamespace(options) {
    const iom = sio_controller_1.SioController.getInstance();
    return function (target) {
        target[sio_controller_1.sioNamespaceProp] = options;
        iom.addIoNamespace(target);
    };
}
exports.SioNamespace = SioNamespace;
//# sourceMappingURL=sio-namespace.js.map