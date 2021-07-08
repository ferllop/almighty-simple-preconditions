# Almighty Simple Preconditions

A simple library to be able to assert preconditions in our javascript methods or functions. 

No matchers, just boolean operations.

## Activation
You have to activate preconditions explicitly setting a ENABLE_PRECONDITIONS to true. You can do it in two ways:

1. Enable when executing the command. For example:
```
$ ENABLE_PRECONDITIONS=true node index.js 
```
or in npm script:
```
"scripts" : {
    start: "ENABLE_PRECONDITIONS=true node index.js"
}
```
<br />

2. Enable in your environment running:
 ```
 export ENABLE_PRECONDITIONS=true
 ```
and then you can run your commands normally, like:
```
$ node index.js
```
For having this last option working after rebooting your machine, remember to put it in your .bashrc (or similar if you use another shell)

<br />

## Usage
This will throw a PreconditionAssert if paramA is null:
```
someFunction(num) {
    precondition(typeof num === "number" && num > 0)
    return 1 / num
}
```
And the error.message will be like this:
```
Precondition "typeof num === "number" && num > 0", written on line 5 of file "/project/WithPreconditionClass.js", was offended by call "this.withPreconditionClass.preconditionedMethod(-1)", written on line 13 of file "/project/ClientClass.js".
```

<br />

## EXAMPLE
You can run an example executing:
```
$ npm run example
```
