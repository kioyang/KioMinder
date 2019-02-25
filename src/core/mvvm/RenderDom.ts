
class RenderDom {
    static render = (el: any, container?: any) => {
        const dom = document.createElement(el.tagName);
        const props = el.props;
        for (let propName in props) {
            const propValue = props[propName];
            dom.setAttribute(propName, propValue);
        }
        const children = el.children || [];
        children.forEach((function(child: any) {
            console.log(child);
            const childEl = (!(typeof child === 'string'))
            ? RenderDom.render(child, dom)
                : document.createTextNode(child);
            console.log(childEl);
            if (childEl) {
                dom.appendChild(childEl);
            }
        }));
        container.appendChild(dom);
    }
}
export default RenderDom;
