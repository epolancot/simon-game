/*----- constants -----*/
const buttons = {
    "1": "green-btn",
    "2": "red-btn",
    "3": "yellow-btn",
    "4": "blue-btn"
}

const emojis = {
    "1": "👍",
    "2": "🤌",
    "3": "😮",
    "4": "😛",
    "5": "😎",
    "6": "🤓",
    "7": "👻",
    "8": "🙌",
    "9": "🧑‍🚀",
    "10": "🥷",
    "11": "💪",
    "12": "🥳"
}

// Game sounds variables using howler.js audio library. (https://github.com/goldfire/howler.js)
// This library fixes Safari Desktop and iOS sound delay issue
const greenSound = new Howl({src: ['../sounds/green.mp3'], html5: true}) //mp3 duration 0.41775
const redSound = new Howl({src: ['../sounds/red.mp3'], html5: true}) //mp3 duration 0.418333
const blueSound = new Howl({src: ['../sounds/blue.mp3'], html5: true}) //mp3 duration 0.5228
const yellowSound = new Howl({src: ['../sounds/yellow.mp3'], html5: true}) //mp3 duration 0.5235
const errorSound = new Howl({src: ['../sounds/error.mp3'], html5: true}) //mp3 duration 1.619594

/*----- state variables -----*/
let turn // Keep track of who is currently playing. 0 = Simon : 1 = Player 
let stepCount // Used to count through the simonPattern array after invoking playSimonPattern()
let currentPlayerStep // Keep track of player's current step in the sequence (see verify ()) 
let simonPattern = [] // Holds Simon's steps sequence. Ex. ["green-btn", "blue-btn", "blue-btn"] 
let currentScore
let bestScore = 0 

// Time setting for setTimeouts()
let releaseTime = 400 // Controls the color change when the player or Simon clicks().
let simonPlayTime = 1500 // Controls the amount of time between each step when Simon is playing simonPattern sequence.
let correctColorTime = 550 // When the player loses, this controls the amount of time the correct step is displayed on screen.
let transitionTime = 1500 // When the player succesfully finish a sequence, this is the transition time to switch the turn to Simon (used only once at verify()).

/*----- cached elements  -----*/
const scoreContainerEl = document.getElementById("score-container")
const scoreTextEl = document.getElementById("score-text")
const greenBtnEl = document.getElementById("green-btn")
const redBtnEl = document.getElementById("red-btn")
const yellowBtnEl = document.getElementById("yellow-btn")
const blueBtnEl = document.getElementById("blue-btn")
const centerBtnEl = document.getElementById("center-btn")

/*----- event listeners -----*/
document.getElementById("center-btn").addEventListener("click", centerBtnClick)
document.getElementById("green-btn").addEventListener("click", greenBtnClick)
document.getElementById("red-btn").addEventListener("click", redBtnClick)
document.getElementById("yellow-btn").addEventListener("click", yellowBtnClick)
document.getElementById("blue-btn").addEventListener("click", blueBtnClick)
document.getElementById("switch").addEventListener("click", modeToggle)

/*----- functions -----*/
init();

function init() {
    // Disable play buttons. Enable Start button.
    setPlayBtnStatus("disabled")

    // Initialize variables.
    simonPattern = []
    currentScore = 0
    stepCount = 0
    turn = 0
    currentPlayerStep = 0

    // Prepare center button caption.
    centerBtnEl.style.fontFamily = "Helvetica"
    centerBtnEl.innerHTML = "Start"

    scoreContainerEl.innerHTML = `<div id='score-text'>Best:</div><div id='best-score'>${bestScore}</div>`
    centerBtnEl.style.backgroundColor = "rbg(0,0,0)"
}

function render() {
    renderBestScore()
    addNewStep()
}

function renderBestScore() {
    scoreContainerEl.style.display = "grid"
    scoreContainerEl.innerHTML = `<div id='score-text'>Best:</div><div id='best-score'>${bestScore}</div>`
    centerBtnEl.style.backgroundColor = "rgb(0,0,0)"
}

function addNewStep() {
    // Simon's pattern is generated as the game is played by adding one step to simonPattern array each cycle.
    // To add a new step, first a random number between 1-4 is generated (representing one of the four buttons).
    const randomNumber = Math.floor(Math.random() * 4) + 1

    // The random number is used as a key to find the correspoding button in the buttons object (see constants section)
    // to push said button's label into the simonPattern array.
    simonPattern.push(buttons[randomNumber])

    stepCount++

    if (simonPattern.length > 1) {
        centerBtnEl.style.fontFamily = "Orbitron"
        centerBtnEl.innerText = simonPattern.length
    } else {
        centerBtnEl.style.fontFamily = "Helvetica"
        centerBtnEl.innerText = "Your turn!"
    }

    playSimonPattern()
}

function playSimonPattern() {
    let index = stepCount - 1

    // This function plays simonPattern array sequence
    if (stepCount <= simonPattern.length) {
        setPlayBtnStatus("disabled")
        if (simonPattern[index] === "green-btn") {
            greenBtnClick()
            setTimeout(playSimonPattern, simonPlayTime)

        } else if (simonPattern[index] === "red-btn") {
            redBtnClick()
            setTimeout(playSimonPattern, simonPlayTime)

        } else if (simonPattern[index] === "yellow-btn") {
            yellowBtnClick()
            setTimeout(playSimonPattern, simonPlayTime)

        } else if (simonPattern[index] === "blue-btn") {
            blueBtnClick()
            setTimeout(playSimonPattern, simonPlayTime)
        }

        centerBtnEl.style.fontFamily = "Squada One"
        centerBtnEl.innerText = "SIMON"

        stepCount++

    } else {
        turn = 1
        setPlayBtnStatus("enabled")
        centerBtnEl.style.fontFamily = "Orbitron"
        centerBtnEl.innerText = simonPattern.length
    }
}

function setPlayBtnStatus(status) {
    if (status === "enabled"){
        greenBtnEl.disabled = false
        redBtnEl.disabled = false
        blueBtnEl.disabled = false
        yellowBtnEl.disabled = false
        centerBtnEl.disabled = true
    
    } else if (status === "disabled") {
        greenBtnEl.disabled = true
        redBtnEl.disabled = true
        blueBtnEl.disabled = true
        yellowBtnEl.disabled = true
        centerBtnEl.disabled = false
    }
}

function centerBtnClick() {
    render()
}

function greenBtnClick() {
    //first check who is clicking. 1 = user : else = Simon
    if (turn === 1) {
        //verify(selectedButton) returns true if argument matches simonPattern array in this step of the sequence
        if (verify("green-btn")) {
            greenSound.play()
            greenBtnEl.style.backgroundColor = "rgb(99, 225, 99)"
            setTimeout(() => greenBtnEl.style.backgroundColor = "rgb(39, 80, 39)", releaseTime)
        } 
    } else {
        greenSound.play()
        greenBtnEl.style.backgroundColor = "rgb(99, 225, 99)"
        setTimeout(() => greenBtnEl.style.backgroundColor = "rgb(39, 80, 39)", releaseTime)
    }
}

function redBtnClick() {
    if (turn === 1) {
        if (verify("red-btn")) {
            redSound.play()
            redBtnEl.style.backgroundColor = "rgb(255, 66, 63)"
            setTimeout(() => redBtnEl.style.backgroundColor = "rgb(129, 37, 37)", releaseTime)
        } 
    } else {
        redSound.play()
        redBtnEl.style.backgroundColor = "rgb(255, 66, 63)"
        setTimeout(() => redBtnEl.style.backgroundColor = "rgb(129, 37, 37)", releaseTime)
    }
}

function blueBtnClick() {
    if (turn === 1) {
        if (verify("blue-btn")) {
            blueSound.play()
            blueBtnEl.style.backgroundColor = "rgb(68, 111, 255)"
            setTimeout(() => blueBtnEl.style.backgroundColor = "rgb(49, 78, 173)", releaseTime)
        } 
    } else {
        blueSound.play()
        blueBtnEl.style.backgroundColor = "rgb(68, 111, 255)"
        setTimeout(() => blueBtnEl.style.backgroundColor = "rgb(49, 78, 173)", releaseTime)
    }
}

function yellowBtnClick() {
    if (turn === 1) {
        if (verify("yellow-btn")) {
            yellowSound.play()
            yellowBtnEl.style.backgroundColor = "rgb(255, 255, 0)"
            setTimeout(() => yellowBtnEl.style.backgroundColor = "rgb(146, 146, 34)", releaseTime)
        }
    } else {
        yellowSound.play()
        yellowBtnEl.style.backgroundColor = "rgb(255, 255, 0)"
        setTimeout(() => yellowBtnEl.style.backgroundColor = "rgb(146, 146, 34)", releaseTime)
    }
}

function verify(selectedButton) {
    //check if the user is in the final step of the sequence
    if (currentPlayerStep === simonPattern.length - 1) {
        //check if the user's selection matches the step in the sequence
        if (selectedButton === simonPattern[currentPlayerStep]) {
            //reset variables, set Emoji and call render to start the next sequence
            turn = 0
            currentPlayerStep = 0
            stepCount = 0
            setEmoji(simonPattern.length)
            setTimeout(render,transitionTime)
            return true
        } else {
            lose(simonPattern[currentPlayerStep])
            return false
        }
    } else {
        //-the user is currently in the middle of the sequence
        //-check if the user's selection matches the step in simonPattern array in order
        if (selectedButton === simonPattern[currentPlayerStep]) {
            currentPlayerStep++
            return true
        } else {
            lose(simonPattern[currentPlayerStep])
            return false
        }
    }
}

function lose(correctStep) {
    currentScore = simonPattern.length - 1
    errorSound.play()
    //show correct color in the sequence after losing
    if (correctStep==="green-btn") {
        greenBtnEl.style.backgroundColor = "rgb(99, 225, 99)"
        setTimeout(btnRelease => {
            greenBtnEl.style.backgroundColor = "rgb(39, 80, 39)"
        }, correctColorTime)
    } else if (correctStep==="red-btn") {
        redBtnEl.style.backgroundColor = "rgb(255, 66, 63)"
        setTimeout(btnRelease => {
            redBtnEl.style.backgroundColor = "rgb(129, 37, 37)"
        }, correctColorTime)
    } else if (correctStep==="blue-btn") {
        blueBtnEl.style.backgroundColor = "rgb(68, 111, 255)"
        setTimeout(btnRelease => {
            blueBtnEl.style.backgroundColor = "rgb(49, 78, 173)"
        }, correctColorTime)
    } else if (correctStep==="yellow-btn") {
        yellowBtnEl.style.backgroundColor = "rgb(255, 255, 0)"
        setTimeout(btnRelease => {
            yellowBtnEl.style.backgroundColor = "rgb(146, 146, 34)"
        }, correctColorTime)
    }
    if (currentScore > bestScore) {
        bestScore = currentScore
    }
    init()
}

function setEmoji(level) {
    if (level < 5) {
        centerBtnEl.innerText = emojis["1"]
    } else if (level < 10) {
        centerBtnEl.innerText = emojis["2"]
    } else if (level === 10) {
        centerBtnEl.innerText = emojis["3"]
        centerBtnEl.style.background = "radial-gradient(circle, rgba(255,134,0,1) 0%, rgba(0,0,0,1) 30%)"
        simonPlayTime = 1300
    } else if (level < 12) {
        centerBtnEl.innerText = emojis["4"]
    } else if (level < 15) {
        centerBtnEl.innerText = emojis["5"]
    } else if (level === 15 ){
        centerBtnEl.innerText = emojis["6"]                         
        centerBtnEl.style.background = "radial-gradient(circle, rgba(255,134,0,1) 0%, rgba(0,0,0,1) 50%)"
        scoreContainerEl.style.display = "flex"
        scoreContainerEl.innerHTML = "<div id='chat'>Amazing!</div>"
        simonPlayTime = 1000      
    } else if (level < 23) {
        centerBtnEl.innerText = emojis["7"] 
    } else if (level === 23) {
        centerBtnEl.innerText = emojis["8"]
        centerBtnEl.style.background = "radial-gradient(circle, rgba(255,134,0,1) 0%, rgba(0,0,0,1) 70%)"
        scoreContainerEl.style.display = "flex"
        scoreContainerEl.innerHTML = "<div id='chat'>Elon Musk has joined the chat</div>"
        simonPlayTime = 850   
    } else if (level < 26) {
        centerBtnEl.innerText = emojis["9"] 
    } else if (level < 30) {
        centerBtnEl.innerText = emojis["10"] 
    } else if (level < 35) {
        centerBtnEl.innerText = emojis["11"] 
        centerBtnEl.style.background = "radial-gradient(circle, rgba(255,134,0,1) 0%, rgba(0,0,0,1) 90%)"
    } else if (level === 35) {
        centerBtnEl.innerText = emojis["12"] 
        centerBtnEl.style.backgroundColor = "rgb(9,185,92)"
        scoreContainerEl.style.display = "flex"
        scoreContainerEl.innerHTML = "<div id='chat'>I'm out</div>"
    }
}

// Activate/deactivate night mode
function modeToggle() {
    if (document.getElementById("switch").checked) {
        // night mode On
        document.getElementById("main-wrapper").style.background = "#000000"
        document.getElementById("score-container").style.background = "#000000"
        document.getElementById("score-container").style.color = "#ffffff"
        document.getElementById("best-score").style.color = "#ffffff"
        document.getElementById("green-btn").style.borderColor = "#3c3c3c"
        document.getElementById("red-btn").style.borderColor = "#3c3c3c"
        document.getElementById("blue-btn").style.borderColor = "#3c3c3c"
        document.getElementById("yellow-btn").style.borderColor = "#3c3c3c"
    } else {
        // night mode Off
        document.getElementById("main-wrapper").style.background = "#ffffff"
        document.getElementById("score-container").style.background = "#ffffff"
        document.getElementById("score-container").style.color = "#000000"
        document.getElementById("best-score").style.color = "#000000"
        document.getElementById("green-btn").style.borderColor = "#000000"
        document.getElementById("red-btn").style.borderColor = "#000000"
        document.getElementById("blue-btn").style.borderColor = "#000000"
        document.getElementById("yellow-btn").style.borderColor = "#000000"
    }
}

