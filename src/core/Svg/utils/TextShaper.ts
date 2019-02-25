import Node from "../../Tree/Node";

export default class TextShaper {
    private static input: HTMLInputElement;
    static showEdit(node: Node<any>, svg: SVGElement, min: number) {
        this.destroy(svg);
        const { x, y }= node.getDrawPoint();
        const input: any = document.createElement('input');
        input.value = node.name;
        input.id = `minder${node.key}`;
        input.className = 'minder-edit';
        input.style.height = `${node.height}px`;
        input.style.width = `${node.width}px`;
        input.style.left = `${x - node.width}px`;
        input.style.top = `${y + Math.abs(min) + 80}px`;
        input.style.zIndex = '999';
        document.body.appendChild(input);
        input.node = node;
        input.focus();
        document.documentElement.scrollTop = node.value.nodeY;
        this.input = input;
        input.onchange = () => {
            node.name = input.value;
            const dom = document.querySelector(`#node-${node.key}`);
            if (dom) {
                dom.innerHTML =  node.name;
            }
        }
    }
    static destroy(svg: SVGElement) {
        const minders: NodeListOf<Element> = document.querySelectorAll('.minder-edit');
        minders.forEach((minder: any) => {
            if (minder) {
                minder.node.name = minder.value;
                minder.removeEventListener('onchange', () => {});
                let x =  document.body.removeChild(minder);
                x = null;
            }
        });
    }
}
