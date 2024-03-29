import { getOptions } from 'loader-utils';

export default function loader(source) {
    const options = getOptions(this);
    source = source.replace(/\[name\]/g, options.name);
    return `${JSON.stringify(source)}`;
}
