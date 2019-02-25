import Shape from "./Shape";

export default class BezierTo extends Shape{
    draw(options: any) {
        // @ts-ignore
        const context = window.canvasContext;
        const { x0 = this.x, y0 = this.y, cpx1, cpy1, cpx2, cpy2, x, y } = options;
        // context.strokeStyle = '#111';
        context.beginPath();
        context.moveTo(x0, y0);
        context.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, x, y);
        context.stroke();
        return context;
    }
}
