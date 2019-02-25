import Tree from "../Tree/Tree";
import Svg from "./Svg";
import SvgType from './SvgType';
import Node from "../Tree/Node";
import DrawUtil from './utils/DrawUtil';
import TextShaper from './utils/TextShaper';
import Measure from "../utils/Measure";

class SvgTree {
    tree: Tree<any>;
    level: number = 0;
    private svg: SVGElement;
    private cursor: number = 0;
    generateTree(children: any[] = [], parent: Node<any>) {
        if (!parent.children) {
            parent.children = [];
        }
        children.forEach((item: any) => {
            const node = new Node();
            const { id, name,desc, parentId, level,value, key, width, height, padding, children } = item;
            node.id = id;
            node.name = name;
            node.desc = desc;
            node.parentId = parent.id;
            node.level = level;
            node.value = value;
            node.key = key;
            node.width = width;
            node.height = height;
            node.padding = padding;
            node.parentNode = parent;
            parent.children.push(node);
            if (children) {
                this.generateTree(children, node);
            }
        });
    }
    init() {
        const tree: any = new Tree();
        this.tree = tree;
        // 计算出起始点的坐标， 定义一个常量作为初始大小
        // 每个node节点有其相关的属性
        const treeString = localStorage.getItem('tree');
        if (treeString) {
            const treeData = JSON.parse(treeString);
            const root = treeData.root;
            this.tree.keyCount = +root.keyCount;
            const children = root.children;
            const node = new Node();
            const { id, name,desc, parentId, level,value, key, width, height, padding } = root;
            node.id = id;
            node.name = name;
            node.desc = desc;
            node.parentId = parentId;
            node.level = level;
            node.value = value;
            node.key = key;
            node.width = width;
            node.height = height;
            node.padding = padding;
            this.generateTree(children, node);
            this.tree.root = node;
        } else {
            tree.insert(null, this.generateRootNode());
        }
        // 在页面中挂载一个svg画布
        const svg = Svg.init();
        this.svg = svg;
        // @ts-ignore
        window.svg1 = svg;
        this.drawTree();
        this.bindEvent(svg);
        return this;
    }
    exportJson = (keyCount: number) => {
        /* 导出 node 上整棵树的数据为 JSON */
        const json = {
            root: this.exportNode(this.tree.root)
        };

        return JSON.parse(JSON.stringify(json));
    }
     exportNode(node: Node<any>) {
        const { id, name,desc, parentId, level,value, key, width, height, padding } = node;
        const obj: any = {
            id, name,desc, parentId, level,value, key, width, height, padding
        };
        const exported: any = {};
        exported.keyCount = this.tree.keyCount;
        for(const item in obj) {
            exported[item] = node[item];
        }
        const childNodes = node.children || [];
        exported.children = [];
        for (let i = 0; i < childNodes.length; i++) {
            exported.children.push(this.exportNode(childNodes[i]));
        }
        return exported;
    }
    save() {
        localStorage.setItem('tree', JSON.stringify(this.exportJson(this.tree.keyCount)));
    }
    // 绘制思维导图
    drawTree() {
        TextShaper.destroy(this.svg);
        const x = this.level * 200;
        const y = this.tree.min || 0;
        const { width, height } = Measure.getWorld();
        const cha = this.tree.max - this.tree.min;
        const realHeight = cha < height ? height : cha;
        DrawUtil.drawTree(this.tree, this.svg, y);
        Svg.resetSvg(x, y, width + x ,realHeight + 200);
        console.log(this.tree, 'tree');
        console.log([this.tree].join(''));
        const mapData = new Map();
        mapData.set('tree', this.tree);
        console.log('mapdata', mapData);
        let json: any = {};
        for(let [k,v] of mapData){
            json[k]=v;
        }
        console.log(json);

        localStorage.setItem('treeData',JSON.stringify(json));
    }
    bindEvent(svg: SVGElement) {
        // 事件代理
        const that = this;
        svg.addEventListener('click', function (e) {
            const clickDom: any = e.srcElement || e.currentTarget;
            const type = clickDom.dataset.type;
            const of = clickDom.getAttribute('of');
            switch (parseInt(type)) {
                case SvgType.NODE:
                    that.nodeClick(of);
                    break;
                case SvgType.CONNECT:
                    break;
                case SvgType.ADD:
                    that.addClick(of);
                    break;
                case 99:
                    that.deleteNode(of);
                    break;
                default:
                    TextShaper.destroy(svg);
            }
        });
    }
    nodeClick(of: any) {
        // 点击Node node变为可编辑
        const ofs = JSON.parse(of);
        const ofNode = this.tree.search(ofs);
        TextShaper.showEdit(ofNode, this.svg, this.tree.min);
    }
    deleteNode(of: any) {
        // 添加一个节点
        const location = JSON.parse(of);
        const tree = this.tree;
        let node: any = tree.search(location);
        this.tree.delete(node);
        this.drawTree();
    }
    addClick(of: any) {
        // 添加一个节点
        const location = JSON.parse(of);
        const tree = this.tree;
        const loc = tree.search(location);
        this.generateAddNode(loc);
        this.drawTree();
    }
    // 绘制子节点间的间距无问题
    resetChildData(location: Node<any>): void {
        // 首先获取父节点也即插入位置的中心坐标
        const { nodeX, nodeY } = location.value;
        let hfx = nodeX, // 父节点的中心x轴坐标
            hfy = nodeY, // 父节点的中心y轴坐标
            parentWidth = location.width / 2, // 父节点的宽度
            children = location.children, // 子节点列表
            interval = 184 // 节点间水平间距

        let childX: number = hfx + parentWidth + interval, // 子节点的x轴坐标
            startY: number, // 子节点区域的起始坐标
            childrenAreaHeight = 0; // 子节点总区域高度
        const that = this;
        children.forEach(function(child){
            const curAreaHeight = that.getNodeAreaHeight(child);
            childrenAreaHeight += curAreaHeight;
        });

        startY = hfy - childrenAreaHeight / 2;
        children.forEach(function(child){
            const childY = startY;
            const curAreaHeight = that.getNodeAreaHeight(child);
            child.value.nodeX = childX;
            child.value.nodeY = childY + curAreaHeight / 2;
            startY += curAreaHeight;
            if (child.children.length) {
                that.resetChildData(child);
            }
        });
    }
    resetParentData(node: Node<any>) {
        let moveY = 40;
        let brother: any;                    // 同级节点
        const that = this;
        if(node.parentNode){
            if (node.children.length === 1) {
                return;
            }
            node.parentNode.children.forEach(function(curNode: Node<any>){
                    // 遍历同级节点 自身不移动
                brother = curNode;
                    if(curNode !== node){
                        if(brother.value.nodeY < node.value.nodeY){
                            // 向上移动brother节点的代码写在这
                            brother.value.nodeY -= moveY;
                            that.resetChildData(brother);
                        }
                        else {
                            // 向下移动brother节点的代码写在这
                            brother.value.nodeY += moveY;
                            that.resetChildData(brother);
                        }
                    } else {
                    }
                }
            );
        }
        // 递归父节点
        if(node.parentNode){
            this.resetParentData(node.parentNode);
        }
    }
    generateAddNode(location: Node<any>) {
        // 将新节点插入到对应的位置
        const addNode: Node<any> = new Node();
        let { id, level } = location;
        const { nodeX, nodeY } = location.value;
        const properties: any = {
            name: '子主题',
            desc: '子节点',
            parentId: id, // 说明是父节点
            children: [],
            level: level + 1,
            value: { nodeX: nodeX, nodeY}
        };
        if (level + 1 > this.level) {
            this.level = level + 1;
        }
        for (const item in properties) {
            addNode[item] = properties[item];
        }
        // 先从数据层面插入该节点
        const key = this.tree.insert(location, addNode);
        this.cursor = key;
        if (location) {}
        // 算法一:子节点位置的重绘
        this.resetChildData(location);
        // 算法二: 祖先节点的同级节点的垂直位置调
        this.resetParentData(location);
    }
    getNodeAreaHeight(node: Node<any>) {
        //如果结点不是叶结点,则从子结点中累加高度
        const { children } = node;
        if (children.length) {
            let height = 0;
            const that = this;
            children.forEach((function (item: Node<any>) {
                height += that.getNodeAreaHeight(item);
            }))
            return height;
        } else {
            return this.getBoxHeight(node);
        }
    }
    getBoxHeight(node: any): number {
        return node.height + node.padding * 2;
    }
    generateRootNode(): Node<any> {
        // 为tree中的根root赋值，并返回一个元素字符串
        // 默认根节点的位置在中间
        const root: Node<any> = new Node();
        // @ts-ignore
        const { width, height } = Measure.getWorld();
        const nodeX = width / 4, nodeY = height / 10;
        const properties: any = {
            id: 0,
            name: '中心主题',
            desc: '根节点',
            parentId: null, // 说明是父节点
            children: [],
            level: 0,
            value: { nodeX, nodeY },
        };
        for (const item in properties) {
            root[item] = properties[item];
        }
        return root;
    }
}
export default SvgTree;
