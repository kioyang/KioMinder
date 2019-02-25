import Shape from "./Shape";

export default class FillRect extends Shape{
    draw(options?: any) {
        // @ts-ignore
        const context = window.canvasContext;
        const { x = this.x, y = this.y, w = 30, h = 30, fillColor = this.fillColor } = options;
        context.fillStyle = fillColor;
        context.beginPath();
        context.fillRect(x, y, w, h);
        context.closePath();
        context.fill();
        return context;
    }
}
