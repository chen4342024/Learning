function Animal() {
    this.name = "animal";
    this.colors = [1, 2, 3];
}

Animal.prototype.run = function () {
    console.log("animal run");
};

Cat.prototype = new Animal();

function Cat() {
    this.type = "red cat";
}

Cat.prototype.jump = function () {
    console.log("jump ");
};

var cat1 = new Cat();

cat1.jump();
cat1.run();
console.log("cat1.name--> %s", cat1.name);
console.log("cat1.type--> %s", cat1.type);

console.log("cat1 instanceof Animal;---> %s", cat1 instanceof Animal);
console.log("cat1 instanceof Cat;---> %s", cat1 instanceof Cat);

console.log("Animal.prototype.isPrototypeOf;---> %s", Animal.prototype.isPrototypeOf(cat1));
console.log("Cat.prototype.isPrototypeOf---> %s", Cat.prototype.isPrototypeOf(cat1));

var cat2 = new Cat();
cat2.colors.push("4");
console.log("cat1.name--> %o", cat1.colors);
console.log("cat2.name--> %o", cat2.colors);


function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

var cloneAnimalProto = object(Animal.prototype);
console.log("cloneAnimalProto ---> %o", cloneAnimalProto);

