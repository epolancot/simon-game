# Simon game
![Smile](/assets/imgs/game-intro.png)

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
- Affinity Photo

---

# **_Getting Started_**

### **Wireframing**

![Smile](https://www.buckerblog.com/wp-content/uploads/2023/05/Simon.png)

After the first functional implementation of this project, beta tester complained about confusing scores display. The Current Score now resides in the center of the controls, saving screen real estate and putting that DOM element to work full time.

--- 

#### **In the beginning the buttons were sad**
![Sad buttons](/assets/imgs/game-intro-basic-buttons.png)

#### With some CSS' border-radius love they are now full of joy, waiting for avid players to try their best to beat Simon. 

#### The game is carried by the following Javascript functions:
- init() --> Starts/resets variables and DOM elements.
- render() --> call renderBestScores() and addNewStep().
- renderBestScore() --> updates **_div id="best-score"_**.
- addNewStep() --> Generate random number, adds it to simonPattern array and calls playSimonPattern().
- playSimonPattern() --> Reads through simonPattern array and calls the click function per step.
- button functions --> Each button's onClick/release events
- verify() --> Checks if the player's current click in the sequence is found in simonPattern array in the correct order.
- lose() --> Sets the best score (if needed) and call the init() function to restart the game.
- modeToggle() --> Updates DOM elements depending if dark mode is selected or not.


---

### **_Future Updates_**

- Improve difficulty in advanced levels

