console.log('开始绘图');
import StraightLine from './shapes/StraightLine';
import Circle from './shapes/Circle';
import Text from './shapes/Text';
import datas from './datas';

function draw(ele) {
    var context = getContext(ele);
    console.log(context, 'context');
    datas && datas.map((item) => {

    });
    for (var item in datas) {
        var itemData = datas[item];
        var lineData = itemData.lineData;
        var circleData = itemData.circleData
        StraightLine.draw(context, lineData);
        Circle.draw(context, circleData);
        Text.draw(context, circleData);
    }
}
function getContext(dom) {
    var context = dom.getContext('2d');
    return context;
}
export default draw;
