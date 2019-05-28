import webpack from 'webpack';
import getConfig from '../webpack.config';

export default (fixture, options = {}) => {
    const compiler = webpack(getConfig(fixture));

    // compiler.outputFileSystem = new memoryfs();

    return new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
            if (err) reject(err);
            resolve(stats);
        });
    });
};
