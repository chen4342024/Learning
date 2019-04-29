import { getOptions } from 'loader-utils';

export default function loader(source) {
    console.log('loader 2', source);
    const options = getOptions(this);
    source = `${options.wrap} ${source} ${options.wrap}`;
    return `${source}`;
}
