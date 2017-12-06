import { sioEventProp, SioEventOptions } from '../core/sio-controller';

export function SioEvent(SioEventOptions): MethodDecorator {
  return function (target: (socket: SocketIO.Socket, data?: any) => {}, name) {
    if (!target.constructor[sioEventProp]) {
      target.constructor[sioEventProp] = [];
    }

    target.constructor[sioEventProp].push(
      {
        name:name,
        SioEventOptions
      });
  };
}
