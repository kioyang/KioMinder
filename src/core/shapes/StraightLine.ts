import Shape from "./Shape";

export default class StraightLine extends Shape{
    public draw(options: any) {
        // @ts-ignore
        const context = window.canvasContext;
        const { startX = this.x, startY = this.y, endX = 30, endY = 30, fillColor = this.fillColor } = options;
        context.strokeStyle = fillColor;
        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(endX, endY);
        context.closePath();
        context.stroke();
        return context;
    }
}
