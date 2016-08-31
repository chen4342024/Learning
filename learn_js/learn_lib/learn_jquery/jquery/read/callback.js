//var callbacks = $.Callbacks("once");
//callbacks.add(fn1);
//callbacks.fire("foo");
//callbacks.add(fn2);
//callbacks.fire("bar");
//callbacks.remove(fn2);
//callbacks.fire("foobar");


////////////////////////**/
var callbacks = $.Callbacks( "memory" );
callbacks.add( fn1 );
callbacks.fire( "foo" );
callbacks.fire( "foo2" );
callbacks.add( fn2 );
callbacks.fire( "bar" );
callbacks.remove( fn2 );
callbacks.fire( "foobar" );

/////////////////////////
//var callbacks = $.Callbacks( "unique" );
//callbacks.add( fn1 );
//callbacks.fire( "foo" );
//callbacks.add( fn1 ); // repeat addition
//callbacks.add( fn2 );
//callbacks.fire( "bar" );
//callbacks.remove( fn2 );
//callbacks.fire( "foobar" );


/////////////////////////////////
//var callbacks = $.Callbacks( "stopOnFalse");
//callbacks.add( fn2 );
//callbacks.fire( "foo" );
//callbacks.add( fn1 );
//callbacks.fire( "bar" );
//callbacks.fire( "foobar" );

function fn1(value) {
    console.log("fn1 says:" + value);
    //callbacks.fire( "foo" );
}

function fn2(value) {
    console.log("fn2 says:" + value);
    return false;
}