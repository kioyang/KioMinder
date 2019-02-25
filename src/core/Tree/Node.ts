
import  Consts from '../Svg/const';

export default class Node<T> {
    [index: string]: any;
    private _id: number;
    private _key: number;
    private _name: string;
    private _desc: string;
    private _value: T;
    private _width: number = Consts.NODE_WIDTH_DISTANCE;
    private _height: number = Consts.NODE_HEIGHT_DISTANCE;
    private _keyCount: number = 0;

    get keyCount(): number {
        return this._keyCount;
    }

    set keyCount(value: number) {
        this._keyCount = value;
    }

    get width(): number {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
    }

    get height(): number {
        return this._height;
    }

    set height(value: number) {
        this._height = value;
    }

    private _padding: number = 20;
    private _parentId: number;
    private _children: Array<Node<T>>;
    private _level: number;
    private _parentNode: Node<T>;
    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }
    get key(): number {
        return this._key;
    }

    set key(value: number) {
        this._key = value;
    }


    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get desc(): string {
        return this._desc;
    }

    set desc(value: string) {
        this._desc = value;
    }
    get value(): T {
        return this._value;
    }

    set value(value: T) {
        this._value = value;
    }
    set padding(value: number) {
        this._padding = value;
    }
    get padding(): number {
        return this._padding;
    }
    get parentId(): number {
        return this._parentId;
    }

    set parentId(value: number) {
        this._parentId = value;
    }

    get children(): Array<Node<T>> {
        return this._children;
    }

    set children(value: Array<Node<T>>) {
        this._children = value;
    }

    get parentNode(): Node<T> {
        return this._parentNode;
    }

    set parentNode(value: Node<T>) {
        this._parentNode = value;
    }

    get level(): number {
        return this._level;
    }

    set level(value: number) {
        this._level = value;
    }
    getDrawPoint(): any {
        const value: any = this.value;
        const nodeX = value.nodeX;
        const nodeY = value.nodeY;
        const x = nodeX + this.width / 2;
        const y = nodeY + this.height / 2;
        return { x, y};
    }
    toJson() {

    }
}
