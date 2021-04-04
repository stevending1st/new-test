> -  原文地址：[JavaScript Map – How to Use the JS .map() Function (Array Method)](https://www.freecodecamp.org/news/javascript-map-how-to-use-the-js-map-function-array-method/)
> -  原文作者：[Nathan SebhastianNathan Sebhastian](https://www.freecodecamp.org/news/author/nsebhastian/)
> -  译者：
> -  校对者：

![JavaScript Map – How to Use the JS .map() Function (Array Method)](https://www.freecodecamp.org/news/content/images/size/w2000/2021/03/javascript-map-function.png)

Sometimes you may need to take an array and apply some procedure to its elements so that you get a new array with modified elements.

Instead of manually iterating over the array using a loop, you can simply use the built-in `Array.map()` method.

The `Array.map()` method allows you to iterate over an array and modify its elements using a callback function. The callback function will then be executed on each of the array's elements.

For example, suppose you have the following array element:

```js
let arr = [3, 4, 5, 6];
```

A simple JavaScript array

Now imagine you are required to multiply each of the array's elements by `3`. You might consider using a `for` loop as follows:

```js
let arr = [3, 4, 5, 6];

for (let i = 0; i < arr.length; i++){
  arr[i] = arr[i] * 3;
}

console.log(arr); // [9, 12, 15, 18]
```

Iterate over an array using for loop

But you can actually use the `Array.map()` method to achieve the same result. Here's an example:

```js
let arr = [3, 4, 5, 6];

let modifiedArr = arr.map(function(element){
    return element *3;
});

console.log(modifiedArr); // [9, 12, 15, 18]
```

Iterate over an array using map() method

The `Array.map()` method is commonly used to apply some changes to the elements, whether multiplying by a specific number as in the code above, or doing any other operations that you might require for your application.

## How to use map() over an array of objects

For example, you may have an array of objects that stores `firstName` and `lastName` values of your friends as follows:

```js
let users = [
  {firstName : "Susan", lastName: "Steward"},
  {firstName : "Daniel", lastName: "Longbottom"},
  {firstName : "Jacob", lastName: "Black"}
];

```

An array of objects

You can use the `map()` method to iterate over the array and join the values of  `firstName` and `lastName` as follows:

```js
let users = [
  {firstName : "Susan", lastName: "Steward"},
  {firstName : "Daniel", lastName: "Longbottom"},
  {firstName : "Jacob", lastName: "Black"}
];

let userFullnames = users.map(function(element){
    return `${element.firstName} ${element.lastName}`;
})

console.log(userFullnames);
// ["Susan Steward", "Daniel Longbottom", "Jacob Black"]
```

Use map() method to iterate over an array of objects

The `map()` method passes more than just an element. Let's see all arguments passed by `map()` to the callback function.

## The complete map() method syntax

The syntax for the `map()` method is as follows:

```js
arr.map(function(element, index, array){  }, this);
```

The callback `function()` is called on each array element, and the `map()` method always passes the current `element`, the `index` of the current element, and the whole `array` object to it.

The `this` argument will be used inside the callback function. By default, its value is `undefined` . For example, here's how to change the `this` value to the number `80`:

```js
let arr = [2, 3, 5, 7]

arr.map(function(element, index, array){
	console.log(this) // 80
}, 80);
```

Assigning number value to map() method this argument

You can also test the other arguments using `console.log()` if you're interested:

```js
let arr = [2, 3, 5, 7]

arr.map(function(element, index, array){
    console.log(element);
    console.log(index);
    console.log(array);
    return element;
}, 80);
```

Logging the arguments to see the values

And that's all you need to know about the `Array.map()` method. Most often, you will only use the `element` argument inside the callback function while ignoring the rest. That's what I usually do in my daily projects :)

## ******Thanks for reading this tutorial******

You may also be interested in other JavaScript tutorials that I've written, including [how to sum an array of objects](https://sebhastian.com/javascript-sum-array-objects/) and [methods to find a palindrome string](https://sebhastian.com/palindrome-javascript/). They are some of the most commonly asked JavaScript problems to solve.

I also have a [free newsletter](https://sebhastian.com/newsletter/) about web development tutorials (mostly JavaScript-related).