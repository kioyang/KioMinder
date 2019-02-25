import Shape from "./Shape";

export default class ArcTo extends Shape{
    get radius(): number {
        return this._radius;
    }
    set radius(value: number) {
        this._radius = value;
    }
    private _radius:number = 10;

    constructor(props:any) {
        super(props);
        const { radius = 10 } = props;
        this._radius = radius;
    }
    draw(options: any) {
        // @ts-ignore
        const context = window.canvasContext;
        const { x0 = this.x, y0 = this.y, x1 = this.x + 10, y1 = this.y + 10, x2 = 30, y2 = 30 ,radius = this.radius, fillColor = this.fillColor } = options;
        context.strokeSyle = fillColor;
        context.beginPath();
        context.moveTo(x0,y0);
        context.arcTo(x1,y1,x2,y2,radius);
        context.closePath();
        context.stroke();
        return context;
    }
}
