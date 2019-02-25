import Shape from "./Shape";

export default class FillCircle extends Shape{
    get radius(): number {
        return this._radius;
    }
    set radius(value: number) {
        this._radius = value;
    }
    private _radius:number = 10;

    constructor(props:any) {
        super(props);
        const { radius } = props;
        this._radius = radius;
    }

    draw(options: any) {
        // @ts-ignore
        const context = window.canvasContext;
        const { x = this.x, y = this.y, radius = this.radius, startAngle =0, endAngle = Math.PI * 2,anticlockwise = false,  fillColor = this.fillColor } = options;
        context.strokeStyle = fillColor;
        context.beginPath();
        context.arc(x, y, radius, startAngle, endAngle, anticlockwise);
        context.closePath();
        context.stroke();
        return context;
    }
}
