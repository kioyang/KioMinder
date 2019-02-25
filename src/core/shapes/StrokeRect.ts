import Shape from "./Shape";

export default class StrokeRect extends Shape{
    draw(options?: any) {
        // @ts-ignore
        const context = window.canvasContext;
        const { x = this.x, y = this.y, w = 30, h = 30, fillColor = this.fillColor } = options;
        context.strokeStyle = fillColor;
        context.beginPath();
        context.strokeRect(x, y, w, h);
        context.closePath();
        return context;
    }
}
