import {SioController} from './../core/sio-controller'
export function SioSocketServer(target, key:string) : any
{
    let _val = this[key];
    let getter = function(){
        return SioController.getInstance().rootSocketServer();
    }
    Object.defineProperty(target,key, {
        get:getter
    });
}