/**
 * 传进来的对象的value追加前缀
 */
export function addPrefix(objs, prefix) {
    let newObjects = {};
    for (let key in objs) {
        newObjects[key] = prefix + objs[key];
    }
    return newObjects;
}