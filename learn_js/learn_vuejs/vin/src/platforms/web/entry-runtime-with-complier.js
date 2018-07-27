import Vin from '../../core/instance/index'
import { query, getOuterHTML } from './utils/index'
import { mountComponent } from '../../core/instance/lifecycle'
import { VNode } from '../../core/vdom/vnode';


Vin.prototype.$mount = function(el) {
    el = el && query(el);
    const options = this.$options;
    let template = options.template;
    if (!template && el) {
        template = getOuterHTML(el)
    }
    if (!options.render) {
        if (template) {
            options.render = compileToFunctions(template, { vm: this });
        }
    }
    return mountComponent(this, el);
}


/**
 * 将模板转化成render方法
 * @param {}} template 模板
 * @param {*} options 选项
 */
function compileToFunctions(template, options) {
    let vm = options.vm;
    return function(data) {
        return new VNode({
            template: template,
            vm: vm
        });
    }
}


export default Vin;