"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sio_controller_1 = require("../core/sio-controller");
function SioEvent() {
    return function (target, name) {
        if (!target.constructor[sio_controller_1.sioEventProp]) {
            target.constructor[sio_controller_1.sioEventProp] = [];
        }
        target.constructor[sio_controller_1.sioEventProp].push(name);
    };
}
exports.SioEvent = SioEvent;
//# sourceMappingURL=sio-event.js.map