# Simon game
![robot](/assets/imgs/readme-imgs/game-intro.png)

## Date: 5/12/2023

### By: Eric Polanco

#### [GitHub](https://github.com/epolancot) | [LinkedIn](www.linkedin.com/in/epolancot) 

---

## **Description**

#### This project features a fully responsive Simon game with a minimalistic user interface, which includes a toggle switch for dark mode. It was designed using a mobile first approach, but it is fully adaptable to bigger screens.


---

### **Technologies Used**

- Html
- CSS
  - Flexbox
  - Grid
- Javascript

---

# **_Getting Started_**

### **Wireframing**

![wireframe](/assets/imgs/readme-imgs/wireframing.png)

After the first fully functional implementation of this project, the scores display felt a little confusing. The Current Score now resides in the center of the controls, saving screen real estate and putting that DOM element to work full time.

--- 

#### **Typography**
![Sad buttons](/assets/imgs/readme-imgs/typography.png)

#### **In the beginning the buttons were sad... and misplaced! :(**
![Sad buttons](/assets/imgs/readme-imgs/game-intro-basic-buttons.png)

#### With some CSS' border-radius love they are now full of joy, waiting for avid players to try their best to beat Simon. 

#### **Use of CSS gradient to accent level progression**
![Levels](/assets/imgs/readme-imgs/levels.png)

#### **Each time the player completes a sequence, Simon shows an emoji**
![Emojis](/assets/imgs/readme-imgs/emojis.png)


#### Here's a brief explanation of all JS functions used. In order of appearance:
- init() => Starts/resets variables and DOM elements.
- render() => Calls renderBestScores() and addNewStep().
- renderBestScore() => Targets #score-container to update bestScore and updates center button's background.
- addNewStep() => Generates a random number, adds it to simonPattern array and calls playSimonPattern().
- playSimonPattern() => Reads through simonPattern array and calls the click function of each button as they appear in the array.
- Button functions:
  - setPlayBtnStatus()=> Enable/Disable controls.
  - click() functions for each color and center button.
- verify() => Checks if the player's current click in the sequence is found in simonPattern array in the correct order.
- lose() => Sets the best score (if higher), performs some house keeping and calls the init() function to restart the game.
- setEmoji() => Displays an emoji from emojis' object depending on the current level.
- modeToggle() => Updates DOM elements for dark mode.

#### **Dark mode is available through a simple toggle switch (so fancy!)**
![Emojis](/assets/imgs/readme-imgs/toggle-switch.png)

### The project itself was deployed and can be viewed [here](http://simongame-ga.surge.com)
---

#### **File tree**
![Emojis](/assets/imgs/readme-imgs/tree.png)

---

### **_Resources_**
- Howler.js: Audio library for cross-browser support. (https://github.com/goldfire/howler.js)
- CSS/HTML Dark mode Toggle Switch - based on Marcus Burnette's via http://www.alvarotrigo.com
- Google fonts: Squada One (Header) and Orbitron (Center button current score)

---

### **_Future Updates_**
- Improve difficulty in advanced levels
- Add repeat Simon's pattern button

