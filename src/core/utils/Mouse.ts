export default class Mouse {
    static wheelMoveEvent(callback: Function) {
        function wheelMove(evt: any){
            const e: any = evt || window.event;
            if(e.wheelDelta){
                callback(e.wheelDelta);
            }else if(e.detail){
                callback(e.detail);
            }
        };
        // @ts-ignore
        document.onmousewheel = function(e: any){
            wheelMove(e);
        }
    }
    static mouseMove(callback: Function) {
        document.onmousemove = function (e) {
            var oEvent=e||window.event;
            callback(oEvent);
        }
    }
}
