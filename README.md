#### Babel plugin assignment push

Important: Don't use it in production, is just proof of concept made for fun when i was learning how Babel plugins works :]

This plugin allows to use '=+' operator to push some element in a given array

#### Example:
```javascript
const run = () => {
  const givenArray = [];

  for (let i = 0; i < 5; i++) {
    givenArray += i;
  }
  console.log("out", givenArray);
};
run();
```
#### Equivalent to:

```javascript
const run = () => {
  const givenArray = [];

  for (let i = 0; i < 5; i++) {
    givenArray.push(i);  //note that
  }
  console.log("out", givenArray);
};
run();
```
#### Test:

1 - `git clone https://github.com/FrancinildoAlvelim/babel-plugin-array-assignment-push.git`

2 - run `npm install` in the cloned directory

3 - `npm test`

