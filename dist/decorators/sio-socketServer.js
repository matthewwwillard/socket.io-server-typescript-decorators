"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sio_controller_1 = require("./../core/sio-controller");
function SioSocketServer(target, key) {
    let getter = function () {
        return sio_controller_1.SioController.getInstance().rootSocketServer();
    };
    Object.defineProperty(target, key, {
        get: getter
    });
}
exports.SioSocketServer = SioSocketServer;
//# sourceMappingURL=sio-socketServer.js.map