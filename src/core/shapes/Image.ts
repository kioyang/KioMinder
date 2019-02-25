import Shape from "./Shape";

export default class Image extends Shape{
    draw(options: any) {
        // @ts-ignore
        const context = window.canvasContext;
        const { img, x = this.x, y = this.y, w, h } = options;
        context.beginPath();
        context.drawImage(img, x, y, w, h);
        context.closePath();
        return context;
    }
}
