function createPerson(name, age) {
    var o = new Object();
    o.name = name;
    o.age = age;
    return o;
}

var person1 = createPerson("andy_chen", 18);
var person2 = createPerson("andy_chen", 18);


function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype = {
    getName: function () {
        return 1;
    }
};

var person3 = new Person("andy_chen", 18);
var person4 = new Person("andy_chen2", 19);
console.log("Person ---> %s", person3.constructor == Person);
console.log("Person instanceof Object---> %s", person3 instanceof Object);
console.log("Person instanceof Person---> %s", person3 instanceof Person);
console.log("person3.getName == person4.getName---> %s", person3.getName == person4.getName);
console.log("Person.prototype.isPrototypeOf ---> %s", Person.prototype.isPrototypeOf(person3));
console.log("Object.getPrototypeOf ---> %s", Object.getPrototypeOf(person3) == Person.prototype);

console.log("person3.hasOwnProperty name ---> %s", person3.hasOwnProperty("name"));
console.log("person3.hasOwnProperty getName ---> %s", person3.hasOwnProperty("getName"));
console.log("person3 getOwnPropertyDescriptor name ---> %o", Object.getOwnPropertyDescriptor(person3, "name"));

