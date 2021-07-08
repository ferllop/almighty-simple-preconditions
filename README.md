# Almighty Simple Preconditions

A simple library to be able to assert preconditions in our javascript methods or functions. 

No matchers, just boolean operations.

## Activation
You have to activate preconditions explicitly setting a ENABLE_PRECONDITIONS to true as an environment variable. You can do it in two ways:

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
and then you can run your commands as usually, like:
```
$ node index.js
```
For having this last option working after rebooting your machine, remember to put it in your .bashrc (or similar if you use another shell)

<br />

## Usage
This will throw a PreconditionError because name is less than two strings:
```
5    function greeting(name) {
6        precondition(typeof name === "string" && name.length > 2)
7        return 'Hello, ' + name
8    }
9    
10    greeting('Pi')
```
And the error.message will be like this:
```
Precondition "typeof name === "string" && name.length > 2", 
written on line 6 of file "/some-project/example.js", 
was offended by call "greeting('Pi')", 
written on line 10 of file "/some-project/example.js".
```

<br />

## EXAMPLE
You can run a more complete example running:
```
$ npm run example
```
