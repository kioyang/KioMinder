export default interface Shape {
    x:number; // 该图形在canvas中的x坐标
    y:number; // 该图形在canvas中的y坐标
    strokeColor:string; // 该图形的描边颜色
    fillColor:string; // 该图形的填充颜色
    draw: (context: object, options: object) => {}
}
