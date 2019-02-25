import TreeInterface from "./interface/Tree";
import Node from './Node';

class Tree<T> implements TreeInterface<T>{
    root: Node<T>;
    private _keyCount:number = 0;
    private count: number;
    min: any = 0;
    max: any | number = 0;
    delete(node: Node<T>) {
        if(node.parentNode) {
            const children = node.parentNode.children;
            const newChildren: any = [];
            children.forEach((item: Node<any>) => {
                if (node.id !== item.id) {
                    newChildren.push(item);
                }
            });
            node.parentNode.children = newChildren;
            console.log(node.parentNode, 'parentNode', node);
        }
    }
    insert(location: Node<T>, node: Node<T>): number {
        // 如果这颗树的根节点为空 并且
        if (!this.root) {
            node.key = this._keyCount;
            this.root = node;
            return;
        }
        this._keyCount++;
        if (!location) {
            console.log('%c请传入插入位置 at 19 Tree.insert(...)', 'color: #df2e24');
            return;
        }
        const that = this;
        this.traverse(this.root,function (item: Node<T>) {
            const value: any = item.value;
            that.min = that.min > value.nodeY ? value.nodeY : that.min;
            that.max = that.max < value.nodeY ? value.nodeY : that.max;
        });
        node.id = this._keyCount;
        node.parentNode = location;
        node.parentId = location.id;
        node.key = this._keyCount;
        location.children && location.children.push(node);
        return node.key;
    }
    search(item: any, searchStart?: Node<T>): Node<T> {
        let result: Node<T> = null;
        this.traverse(searchStart || this.root,(node: Node<T>) => {
            if (+item.key === +node.key) {
                result = node;
            }
        });
        return result;
    }
    traverse(node: Node<T>, callback: Function,): void {
        this.count = 0;
       this.inOrderTraverse(node, callback);
       this.count = 0;
    }
    inOrderTraverse(cursor: any, callback: Function) {
        const children = cursor.children;
        if (children && children.length) {
            children.forEach((item: Node<T>) => {
                this.inOrderTraverse(item, callback);
            })
        }
        callback(cursor, this.count);
        this.count++;
        return cursor;
    }

    get keyCount(): number {
        return this._keyCount;
    }

    set keyCount(value: number) {
        this._keyCount = value;
    }

    destroy(callback: Function): void {
    }
    empty(): void {
    }
}

export default Tree;
