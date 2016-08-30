


function test01(){
    var person = {
        _age:20,
        height:1.6
    };
    Object.defineProperty(person,"age",{
        enumerable:true,
        get:function(){
            return this._age;
        },
        set:function(newValue){
            if(newValue > 25){
                this._age = newValue;
                this.height = 1.8;
            }
            this._age = newValue;
        }
    });
    Object.defineProperty(person,"height",{
        enumerable:true
    });
    person.age = 10;
    console.log("person --->%s,%s",person.height,person.age);
    person.age = 30;
    console.log("person --->%s,%s",person.height,person.age);

    var descriptorAge = Object.getOwnPropertyDescriptor(person,"age");
    var descriptorHeight = Object.getOwnPropertyDescriptor(person,"height");
    var descriptor_Age = Object.getOwnPropertyDescriptor(person,"_age");
    logDescriptor(descriptorAge,"descriptorAge");
    logDescriptor(descriptorHeight,"descriptorHeight");
    logDescriptor(descriptor_Age,"descriptor_Age");

}

function logDescriptor(descriptor,prefix){
    console.log(prefix + " value --->" + descriptor.value);
    console.log(prefix + " configurable --->" + descriptor.configurable);
    console.log(prefix + " enumerable --->" + descriptor.enumerable);
    console.log(prefix + " writable --->" + descriptor.writable);
    console.log(prefix + " get --->" + descriptor.get);
    console.log(prefix + " set --->" + descriptor.set);
}

test01();