import View from "./View";
import SvgType from "../SvgType";
import Node from "../../Tree/Node";

export default class NodeView implements View{
    destroy(): void {
    }

    init(): void {
    }
    static draw(drawNode: Node<any>): any {
        const color = '#AA997D';
        const { value } = drawNode;
        const { nodeX, nodeY } = value; // 中心点坐标
        const plusMoveX = drawNode.width / 2;
        const noMoveX = drawNode.width / 2;
        const noMoveY = drawNode.height / 2;
        const plusX = nodeX + 15 + plusMoveX; // 加号的坐标
        const plusY = nodeY; // 加号的坐标
        const noX = nodeX - noMoveX; // 节点的坐标
        const noY = nodeY - noMoveY; // 节点的坐标
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        const plus = `<Use xlink:href="#plus" transform="scale(1)" x=${plusX} y=${plusY} data-type=${SvgType.ADD} of=${JSON.stringify({key: drawNode.key})} style="fill: ${color};cursor: pointer;" />`;
        group.innerHTML = plus;
        group.setAttribute('transform', `rotate(0) translate(${noX}, ${noY})`);
        group.setAttribute('style', `fill: #FFE;color: #111`);
        group.setAttribute('data-type', `${SvgType.NODE}`);
        group.setAttribute('of', `${JSON.stringify({key: drawNode.key})}`);
        return { group, plus };
    }

    redraw(): void {
    }
}
