export default interface View {
    init(): void;
    redraw(): void;
    destroy(): void;
}
