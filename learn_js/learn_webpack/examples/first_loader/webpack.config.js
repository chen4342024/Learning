import path from 'path';
import HelloWorldPlugin from './src/myPlugin';
console.log(__dirname);

module.exports = function(fixture) {
    return {
        context: __dirname,
        entry: path.resolve(__dirname, 'test/example.txt'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.txt$/,
                    use: [
                        {
                            loader: path.resolve(__dirname, './src/loader.js'),
                            options: {
                                name: 'Alice'
                            }
                        },
                        {
                            loader: path.resolve(__dirname, './src/loader2.js'),
                            options: {
                                wrap: '123'
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [new HelloWorldPlugin({ options: true })]
    };
};
