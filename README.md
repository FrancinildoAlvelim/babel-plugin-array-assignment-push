#### Babel plugin unary push

<p>⚠️ Important: Don't use it in production, is just proof of concept made for fun when i was learning how Babel plugins works :] </p>

This plugin allows to use '=+' to push an element in a given array

####Example:
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
####Equivalent to:

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
