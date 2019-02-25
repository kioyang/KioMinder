import Measure from "../utils/Measure";

class Svg {
    private svg:SVGElement;
    // 初始化svg,设置视口及宽高为当前平面大小
    init() {
        // @ts-ignore
        const { width, height } = Measure.getWorld();
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', `${width}`);
        svg.setAttribute('height', `${height}`);
        svg.setAttribute('version', `1.1`);
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
        const tree = document.querySelector('#tree');
        tree.appendChild(svg);
        this.svg = svg;
        return this.svg;
    }
    // 节点树变化时, 重新设置svg
    resetSvg(x: number, y: number,width: number, height: number) {
        const svg = this.svg;
        svg.setAttribute('width', `${width}`);
        svg.setAttribute('height', `${height}`);
        svg.setAttribute('version', `1.1`);
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    }
}
export default new Svg();
