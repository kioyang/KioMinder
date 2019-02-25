import Node from "../../Tree/Node";
import Tree from "../../Tree/Tree";
import NodeView from '../widgets/NodeView';

export default class DrawUtil {
    // 全局重新绘制的原因
    // 几乎每次添加或删除一个节点, 页面中的node坐标都会改变,文字的改变也会影响坐标绘制,所以采用整个svg的重绘
    // 但是插入顺序并不影响位置
    static drawTree(tree: Tree<Node<any>>, svg: SVGElement, y: number) {
        svg.innerHTML = '';
        const globalGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        let connects = '';
        globalGroup.setAttribute('transform', `translate(0 ${-y + 100})`);
        tree.traverse(tree.root, (cursor: Node<any>, index: number) => {
            if (cursor) {
                const { group, plus } = NodeView.draw(cursor, tree);
                globalGroup.appendChild(group);
                connects += this.drawConnect(cursor, tree.keyCount) + plus;
            }
        });
        const connectGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        connectGroup.innerHTML = connects;
        globalGroup.appendChild(connectGroup);
        svg.appendChild(globalGroup);
    }
    static drawConnect(drawNode: Node<any>, keyCount: number) {
        const colors = ['#DF2E24', '#189EDF', '#17AC3C', '#189edf'];
        const { value = {} } = drawNode;
        const { nodeX, nodeY } = value; // 中心点坐标
        let connect = ``;
        const startX = nodeX + drawNode.width / 2 + 32 || 92;
        const startY = nodeY;
        drawNode.children && drawNode.children.forEach((item: Node<any>) => {
            const endX = item.value.nodeX - (drawNode.width / 2 || 60);
            const endY = item.value.nodeY;
            const color = colors[Math.ceil(Math.random() * 2)];
            if (item.id === keyCount) {
                connect += `<path class="animate-path" d="M${startX} ${startY} C${endX - 98},${endY},${endX - 20},${endY},${endX},${endY}" style="stroke: ${color};stroke-width: 3;stroke-linecap: round;stroke-linejoin: round;fill: transparent" />`;

            } else {
                connect += `<path class="animate-path1" d="M${startX} ${startY} C${endX - 98},${endY},${endX - 20},${endY},${endX},${endY}" style="stroke: ${color};stroke-width: 3;stroke-linecap: round;stroke-linejoin: round;fill: transparent" />`;
            }
        });
        return connect;
    }
}
