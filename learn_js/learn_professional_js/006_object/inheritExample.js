//function Animal() {
//    this.name = "animal";
//}
//Animal.prototype.getName = function () {
//    return this.name;
//};
//function Cat() {
//    Animal.call(this);
//}
//function object(superProto) {
//    function F() {
//    }
//    F.prototype = superProto;
//    return new F();
//}
//Cat.prototype = object(Animal.prototype);
//Cat.prototype.constructor = Cat;
//Cat.prototype.run = function () {
//    alert("cat run")
//};
//var cat1 = new Cat();
//var cat2 = new Cat();
//cat1.name = "changed name";
//alert(cat1.getName());//changed name
//alert(cat2.getName());//animal
//
//
////function Animal(){
////    this.name="animal";
////}
////Animal.prototype.getName = function() {
////    return this.name;
////};
////function Cat(){
////    Animal.call(this);
////}
////Cat.prototype = new Animal();
////Cat.prototype.constructor = Cat;
////var cat1 = new Cat();
////var cat2 = new Cat();
////cat1.name = "changed name";
////alert(cat1.getName());
////alert(cat2.getName());

//原型继承方式
function object(superProto) {
    function F() {}
    F.prototype = superProto;
    return new F();
}
//公用的继承方法
function inheritPrototype(subType,superType){
    subType.prototype = object(superType.prototype);
    subType.prototype.constructor = subType;
}

function Animal() {
    this.name = "animal";
}
Animal.prototype.getName = function () {
    return this.name;
};
function Cat() {
    Animal.call(this);//借用构造函数
}

inheritPrototype(Cat,Animal);//调用此方法继承原型

//这里可以之后添加子类的方法
Cat.prototype.run = function () {
    alert("cat run")
};
var cat1 = new Cat();
var cat2 = new Cat();
cat1.name = "changed name";
alert(cat1.getName());//changed name
alert(cat2.getName());//animal