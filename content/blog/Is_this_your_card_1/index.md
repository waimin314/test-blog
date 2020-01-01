---
title: Card Guessing game with React part 1
date: 2020-01-01 17:32:38
description: # Add post description (optional)
img: ./title_page.jpg # Add image post (optional)
fig-caption: # Add figcaption (optional)
tags: [React, Is this your card] # add tag
---

### Overview

As part of my learning React journey, I plan to create a card guessing that blew my mind when I was young. I will start with just plain React (Vanilla react as some would call it), and make use of advanced libraries/features as I go. For example, I will not be using Redux or React hooks in the beginning but I will use it when the state management gets too complicated. The reason for doing that is to learn React from the ground up. Sure I could start using Redux staright from the beginning but I would like to have a good understanding of how React state works. I believe I need to know the underlying architecture in order to become proficient in a language.

### Skill Requirement

Basic React knowledge: You should have done your study on React before creating this project. I will not be covering the basics of React.

### Concept

This idea is based on the card trick called "Twenty-One Card Trick", which uses 21 cards. Numberphile has a great explanation for the trick in their [channel](https://www.youtube.com/watch?v=d7dg7gVDWyg 'Numberphile 21 card trick explanation'). We will be using 27 cards but the basic concept is the same.

Firstly, we will have 9 rows x 3 columns of unique cards as shown below.

![grid of cards](./page1.png 'Grid of cards')

<p style="text-align: center;">Fig 1. Grid of cards</p>

Secondly, the user will memorize a card and select the column the card is in. (This step will be repeated three times.)

After selecting the column, the columns will be arranged into rows. For simplicity sake, let's assume the user selected card 7, so row 1 now will be the selected row. Now columns will be reordered into rows as you can seein Figure 2. _(The green and grey colors are for explanation purpose only and will not be in the completed project)_

![Columns to Rows](./row_to_col.png 'Columns to Rows')

<p style="text-align: center;">Fig 2. Columns to Rows</p>

Now the user will select row 1 again as their chosen number,7 is still in row 1

Repeat the Columns to Rows step and we get this.

![Columns to Rows](./cols_to_rows_2.png 'Columns to Rows')

<p style="text-align: center;">Fig 3. Columns to Rows 2nd order </p>

Lastly, the user will of course select 3rd column and yes we can confidently say 7 is their card.

However, if we were to just follow this flow exactly, the user will be able to quickly figure out the trick. Just like the cliché _"A magician never reveals his secrets"_, we should confuse our users with sleight of hand tricks. By tricks, I mean randomization between each reordering without losing track of the possible chosen card.

Alright, that's all for part 1. See you in part 2 :)
