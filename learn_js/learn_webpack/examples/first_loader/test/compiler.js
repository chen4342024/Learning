import path from 'path';
import webpack from 'webpack';
import memoryfs from 'memory-fs';
import HelloWorldPlugin from '../src/myPlugin'

export default (fixture, options = {}) => {
    const compiler = webpack({
        context: __dirname,
        entry: `./${fixture}`,
        output: {
            path: path.resolve(__dirname),
            filename: 'bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.txt$/,
                    use: [
                        {
                            loader: path.resolve(__dirname, '../src/loader.js'),
                            options: {
                                name: 'Alice'
                            }
                        },
                        {
                            loader: path.resolve(
                                __dirname,
                                '../src/loader2.js'
                            ),
                            options: {
                                wrap: '123'
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [new HelloWorldPlugin({ options: true })]
    });

    compiler.outputFileSystem = new memoryfs();

    return new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
            if (err) reject(err);

            resolve(stats);
        });
    });
};
