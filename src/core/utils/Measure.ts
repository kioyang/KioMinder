export default class Measure {
    // 获取世界坐标系的宽高
    static getWorld() {
        const width = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth || 375;
        const height = document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight || 667;
        return { width, height};
    }
}
