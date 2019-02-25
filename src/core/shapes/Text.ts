import Shape from "./Shape";

export default class Text extends Shape{
    draw(options: any) {
        // @ts-ignore
        const context = window.canvasContext;
        const { text, x, y, maxWidth } = options;
        context.beginPath();
        context.fillText(text, x, y, maxWidth);
        context.closePath();
        return context;
    }
}
