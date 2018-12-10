function draw(context, options) {
    context.beginPath();
    context.fillText(options.text, options.w, options.h);
    context.closePath();
}
export default { draw };
