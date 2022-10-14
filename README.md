# Frontend Mentor - Interactive card details form solution

This is a solution to the [Interactive card details form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-card-details-form-XpS8cKZDWw). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Fill in the form and see the card details update in real-time
- Receive error messages when the form is submitted if:
  - Any input field is empty
  - The card number, expiry date, or CVC fields are in the wrong format
- View the optimal layout depending on their device's screen size
- See hover, active, and focus states for interactive elements on the page

### Screenshot

![](./screenshot.png)

### Links

- Live Site URL: [here](https://drac-tiderc.netlify.app)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- [Vanilla JS](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Plain Javascript
- [Icons](https://fontawesome.com/) - For Icons

### What I learned

This project added a tad more to my basic knowledge on JS regex syntax. Also learnt more ways to use the String.split method

```css
input {
  /* For curved border gradients*/
  border: solid 1px transparent;
  border-radius: 10px;
  background-image: linear-gradient(white, white), linear-gradient(var(--light-gray-violet), var(--light-gray-violet));

  background-origin: border-box;
  background-clip: padding-box, border-box;
}

/* This background-image can then be changed on focus */
```

This Javascript code snippet creates an object for the String.split method, and this object allows the method to split strings in fours. It was used in the project to automatically add spaces in the card number input.

```js
const splitByNum = {
  [Symbol.split](str) {
    let num = 4;
    let pos = 0;

    const result = [];
    while (pos < str.length) {
      const groupMatch = str.slice(pos, pos + num);
      if (pos + num >= str.length) {
        result.push(groupMatch);
        break;
      }
      result.push(groupMatch);
      pos += num;
    }
    return result;
  },
};
```

### Useful resources

- [Github Gist](https://gist.github.com/stereokai/36dc0095b9d24ce93b045e2ddc60d7a0) - This Github gist code snippet helped manipulate the CSS, to allow border radius be applied to borders with border images.
- [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split#using_a_custom_splitter) -
  This MDN Documentation enabled me to create a custom Symbol.split object that allowed the card number input to be separated in fours.

## Author

- Frontend Mentor - [@Arnthorny](https://www.frontendmentor.io/profile/Arnthorny)
- Twitter - [@arn_thorny](https://twitter.com/Arn_thorny)
