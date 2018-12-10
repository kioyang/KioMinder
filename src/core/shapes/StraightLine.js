function draw(context, options) {
    context.beginPath();
    context.moveTo(options.startX, options.startY);
    context.lineTo(options.endX, options.endY);
    context.closePath();
    context.stroke();
}
export default { draw };
