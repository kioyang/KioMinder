import ShapeInterface from './interface/Shape';

export default class Shape implements ShapeInterface{
    get fillColor(): string {
        return this._fillColor;
    }

    set fillColor(value: string) {
        this._fillColor = value;
    }
    get strokeColor(): string {
        return this._strokeColor;
    }

    set strokeColor(value: string) {
        this._strokeColor = value;
    }
    get y(): number {
        return this._y;
    }

    set y(value: number) {
        this._y = value;
    }
    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
    }
    private _x: number = 0;
    private _y: number = 0;
    private _strokeColor:string = '#000';
    private _fillColor:string = '#000';
    constructor(props: any) {
        const { x = 0, y = 0, fillColor = 0, strokeColor = 0 } = props;
        this._x = x;
        this._y = y;
        this._fillColor = fillColor;
        this._strokeColor = strokeColor;
    }

    draw(context: object, options: object): object {
        return {};
    }
}
