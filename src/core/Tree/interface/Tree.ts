/**
 * 二叉树
 */
import Node from "../Node";

export default interface Tree<T> {
    // 销毁
    destroy(callback: Function): void;
    // 插入
    insert(location: Node<T>, node: Node<T>): void;
    // 删除
    delete(node: Node<T>): void;
    // 遍历
    empty(): void;
}
