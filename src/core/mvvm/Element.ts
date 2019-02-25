class Elements {
    private tagName: any = '';
    private props: any = {};
    private children: any = [];
    constructor(tagName: string, props: object, children: Array<any>) {
        this.tagName = tagName;
        this.props = props;
        this.children = children;
    }
}
export default Elements;
