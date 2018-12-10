const pluginName = 'ConsoleLogOnBuildWebpackPlugin';

class ConsoleLogOnBuildWebpackPlugin {
    apply(compiler) {
        compiler.hooks.run.tap(pluginName, () => {
            console.log("webpack 构建过程开始！");
        });
    }
}
module.exports = ConsoleLogOnBuildWebpackPlugin;
