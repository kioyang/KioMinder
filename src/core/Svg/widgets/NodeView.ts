import View from "./View";
import SvgType from "../SvgType";
import Consts from "../const";
import Node from "../../Tree/Node";
import Tree from "../../Tree/Tree";

export default class NodeView implements View{
    destroy(): void {
    }

    init(): void {
    }
    static draw(drawNode: Node<any>, tree: Tree<Node<any>>): any {
        const color = '#ED5E32';
        const { value = {} } = drawNode;
        const { nodeX, nodeY } = value; // 中心点坐标
        const plusMoveX = drawNode.width / 2 || 60;
        const noMoveX = drawNode.width / 2 || 60;
        const noMoveY = drawNode.height / 2 || 20;
        const plusX = nodeX + 15 + plusMoveX; // 加号的坐标
        const plusY = nodeY; // 加号的坐标
        const noX = nodeX - noMoveX; // 节点的坐标
        const noY = nodeY - noMoveY; // 节点的坐标
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        const plus = `<Use xlink:href="#plus" transform="scale(1)" x=${plusX} y=${plusY} data-type=${SvgType.ADD} of=${JSON.stringify({key: drawNode.key})} style="fill: ${color};cursor: pointer;" />`;
        group.innerHTML =`<rect
                            x="0"
                            y="0"
                            rx="5"
                            ry="5"
                            width=${Consts.NODE_WIDTH_DISTANCE}
                            height=${Consts.NODE_HEIGHT_DISTANCE}
                              data-type=${SvgType.NODE}
                            of=${JSON.stringify({key: drawNode.key})}
                            ></rect>
                            <switch>
                            <foreignObject
                            width=${Consts.NODE_WIDTH_DISTANCE}
                            height=${Consts.NODE_HEIGHT_DISTANCE}>
                            <p
                            id="node-${drawNode.key}"
                            data-type=${SvgType.NODE}
                            of=${JSON.stringify({key: drawNode.key})}
                            style="font-size:14px;color: #FFF;margin:0;position: relative;height:${drawNode.height + 'px'};line-height: ${drawNode.height + 'px'};overflow: auto;">${drawNode.name}<span style="font-size: 30px;color: #FFF;position: absolute;top: 0;left: 0;cursor: pointer;"
                            data-type="99"
                            of=${JSON.stringify({key: drawNode.key})}>-</span>
                            </span></p></foreignObject>
                             <text
                               data-type=${SvgType.NODE}
                            of=${JSON.stringify({key: drawNode.key})}
                             transform="translate(10, 25)" color="#fff" font-size="16px" style="color: #FFF;" fill="#FFF">${drawNode.name}</text>
                            </switch>
`;
        group.setAttribute('transform', `rotate(0) translate(${noX}, ${noY})`);
        group.setAttribute('style', `fill: #3385FF;color: #FFE`);
        group.setAttribute('data-type', `${SvgType.NODE}`);
        group.setAttribute('of', `${JSON.stringify({key: drawNode.key})}`);
        return { group, plus };
    }

    redraw(): void {
    }
}
