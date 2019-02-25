import Shape from "./Shape";

export default class CurveTo extends Shape{
    draw(options: any) {
        // @ts-ignore
        const context = window.canvasContext;
        const { x0 = this.x, y0 = this.y, cpx = 30, cpy = 30, x =50, y= 50, fillColor = this.fillColor } = options;
        context.strokeStyle = fillColor;
        context.restore();
        context.beginPath();
        context.moveTo(x0, y0);
        context.quadraticCurveTo(cpx, cpy, x, y);
        context.stroke();
        return context;
    }
}
