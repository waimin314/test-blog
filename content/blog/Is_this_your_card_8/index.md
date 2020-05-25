---
title: Card Guessing game with React part 8
date: 2020-05-25 18:12:12
description:
img: title_page.jpg
fig-caption:
tags: [React, Is this your card]
---

## Game loop

The basic functionality of our game is almost complete. We just need a game loop.

We can already guess the correct number on the third select. But it doesn't show the number to the user nor reset the cards to the beginning position. We should also ask the user if they wants to play again.

First of all, let's refactor `colToRows` function. We shouldn't add the loop logic inside the `colToRows` function as it's not relevant. Besides, we should separate the guessing logic, `possibleNums`, from the it as well.

Write a new function call `execute` and call `colToRows` inside it. Don't forget the `colNum` parameter.

```js
execute = (colNumber) => {
  this.colToRows(colNumber);
};
```

Inside our `div` buttons, we need to change the `onClick` callback function to `execute` as well.

```js
<div className="button" onClick={() => this.execute(1)}>
Select
</div>
<div className="button" onClick={() => this.execute(2)}>
Select
</div>
<div className="button" onClick={() => this.execute(3)}>
Select
</div>
```

Next, let's create a function called `updatePossibleNums` and move the guessing logic to there. We will pass the numbers for selected column as `selectedNums`. Now we can get rid of `curPosNums` and use `selectedNums` directly. Don't forget to remove `setState` for `numbers\_.

```js
updatePossibleNums = (selectedNums) => {
  let prvPosNums = this.state.possibleNums;
  // let curPosNums = newNumbers.slice(CARDS_PER_COL * 1, CARDS_PER_COL * 2);
  let newPosNums = [];
  if (prvPosNums.length === 0) {
    newPosNums = selectedNums;
  } else {
    prvPosNums.forEach((n) => {
      if (selectedNums.includes(n)) newPosNums.push(n);
    });
  }
  this.setState(
    {
      // numbers: newNumbers,
      possibleNums: newPosNums,
    },
    () => {
      console.log(this.state.possibleNums);
    }
  );
};
```

We need to remove the `setState` for `possibleNums` from `colToRows` function. We can remove the callback as well.

```js
this.setState(
  {
    numbers: newNumbers,
    // possibleNums: newPosNums
  }
  //   () => {
  //     console.log(this.state.possibleNums);
  //   }
);
```

Since we need the selected numbers for `updatePossibleNums`, we should return the `newNumbers` from `colToRows` function.

```js
this.setState({
  numbers: newNumbers,
});
// highlight-next-line
return newNumbers;
```

In the `execute` function we need to temporarily hold the `newNumbers` variable returned from `colToRows`. And also extract the middle column of the numbers and pass them to `updatePossibleNums()`.

```js
execute = (colNumber) => {
  let tmp_nums = this.colToRows(colNumber);
  this.updatePossibleNums(tmp_nums.slice(CARDS_PER_COL * 1, CARDS_PER_COL * 2));
};
```

The refactoring is complete. Do test again to make sure the card guessing logic is still intact.

Now we can add the `stage`. We will start the `stage` at 0 and increment every time `execute` is called.

```js
constructor(props) {
  super(props);
  this.state = {
    numbers: this.getRandNumArray(),
    possibleNums: [],
    // highlight-next-line
    stage: 0
  };
}
```

```js
execute = (colNumber) => {
  let tmp_nums = this.colToRows(colNumber);
  this.updatePossibleNums(tmp_nums.slice(CARDS_PER_COL * 1, CARDS_PER_COL * 2));
  // highlight-next-line
  this.setState({ stage: this.state.stage + 1 });
};
```

We don't need to do anything for the 1st and 2nd stage. For the third and last stage, we need to show the card the user picked, and ask the user if they want to play again using a Pop Up. Let's make a function called `showPopup` and add it as the callback to setting `stage`.

```js
execute = (colNumber) => {
  let tmp_nums = this.colToRows(colNumber);
  this.updatePossibleNums(tmp_nums.slice(CARDS_PER_COL * 1, CARDS_PER_COL * 2));
  // highlight-next-line
  this.setState({ stage: this.state.stage + 1 }, this.showPopup);
};

showPopup = () => {
  if (this.state.stage === 3) {
    console.log("The number picked is " + this.state.possibleNums[0]);
    console.log("Show Popup");
  }
};
```

That's all for this part. We will create a good looking Popup in the next part.

_Title Photo by_ <a style="background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px" href="https://unsplash.com/@cliffordgatewood?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from Clifford Photography"><span style="display:inline-block;padding:2px 3px"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-2px;fill:white" viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path></svg></span><span style="display:inline-block;padding:2px 3px">Clifford Photography</span></a>`on Unsplash.
