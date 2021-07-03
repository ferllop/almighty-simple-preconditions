# Almighty Simple Preconditions

A library to be able to assert preconditions in our javascript methods or functions.

## Activation
You have to activate preconditions explicitly setting a ENABLE_PRECONDITIONS to true. You can do it in two ways:

1. Enable when starting the command. For example:
```
    $ ENABLE_PRECONDITIONS=true node index.js
```
or in npm script:
```
"scripts" : {
    start: "ENABLE_PRECONDITIONS=true node index.js"
}
```

2. Enable in your environment running:
 ```
 export ENABLE_PRECONDITIONS=true
 ```
and then you can run your commands normally, like:
```
$ node index.js
```
For having this last option working after you reboot your machine, remember to put it in your .bashrc


## Usage
This will throw a PreconditionAssert if paramA is null:
```
someFunction(num) {
    precondition(typeof num === "number" && num > 0)
    return 1 / num
}
```


