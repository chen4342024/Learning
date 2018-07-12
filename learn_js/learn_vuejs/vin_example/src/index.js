import $ from 'jquery'
import "babel-polyfill"

import Vin from '../../vin/dist/bundle.js'

let vin = new Vin({
    data: {
        name: 'andy',
        sex: 'man',
        age: 18
    },
    watch: {
        'name': function(newVal, oldVal) {
            console.log(`name : newVal --> ${newVal} , oldVal --> ${oldVal}`);
        },
        'sex': function(newVal, oldVal) {
            console.log(`sex : newVal --> ${newVal} , oldVal --> ${oldVal}`);
        }
    }
});


vin.$options.data.sex = 'girl';
vin.$options.data.name = 'my new name is haha';