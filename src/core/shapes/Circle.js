function draw(context, options) {
    context.beginPath();
    context.arc(options.w, options.h, 30, 0, 2 * Math.PI, false);
    context.closePath();
    context.stroke();
}
export default { draw };
