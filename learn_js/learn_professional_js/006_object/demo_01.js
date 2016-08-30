/**
 * 测试配置writable
 */
function test01(){
    console.log("---------test01-----------");
    var person = {};
    person.name = "andy_chen";
    person.age = 18;
    Object.defineProperty(person, "name", {
        writable: true,
    });
    Object.defineProperty(person, "age", {
        writable: false,
    });
    console.log(person.name);
    person.name = "nana";
    person.age = 19;
    console.log(person.name);
    console.log("---------test01-----------");
}

//测试配置enumerable
function test02(){
    console.log("---------test02-----------");
    var person = {};
    person.name = "andy_chen";
    person.age = 18;
    for(var key in person){
        console.log("key--->" + key);
    }
    Object.defineProperty(person, "name", {
        enumerable: true,
    });
    Object.defineProperty(person, "name", {
        enumerable: false,
    });
    Object.defineProperty(person, "age", {
        enumerable: false,
    });
    console.log("after change enumerable" );
    for(var key in person){
        console.log("key--->" + key);
    }
    console.log("---------test02-----------");
}

//测试configurable
function test03(){
    console.log("---------test03-----------");
    var person = {};
    person.name = "andy_chen";
    person.age = 18;
    Object.defineProperty(person, "name", {
        configurable: false,
    });
    Object.defineProperty(person, "name", {
        configurable: true,
    });
    console.log("---------test03-----------");
}

test01();
test02();
test03();

