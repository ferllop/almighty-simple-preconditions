# Almighty Simple Preconditions

A library to be able to assert preconditions in our javascript methods or functions.

## Usage
This will throw a PreconditionAssert if paramA is null:
```
someFunction(num) {
    precondition(typeof num === "number" && num > 0)
    return 1 / num
}
```

## To do
Be able to disable the evaluation of preconditions with an environment variable or whatever.
