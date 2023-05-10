/*----- constants -----*/
const options = {
    "1": "green-btn",
    "2": "red-btn",
    "3": "yellow-btn",
    "4": "blue-btn"
}

/*----- state variables -----*/
    let turn // keep track of who is currently playing. 0 = Simon : 1 = Player 
    let bestScore, currentScore // keep track of the scores
    let stepCount // count through the simonPattern array after invoking playSimonPattern()
    let currentPlayerStep // keep track of player's current step (see verify ()) 
    let simonPattern = [] // holds Simon's step sequence. Ex. ["green-btn", "blue-btn", "blue-btn"]

    // game sounds variables
    let greenSound = new Audio('../sounds/green.mp3')
    let redSound = new Audio('../sounds/red.mp3')
    let blueSound = new Audio('../sounds/blue.mp3')
    let yellowSound = new Audio('../sounds/yellow.mp3')
    let errorSound = new Audio('../sounds/error.mp3')



/*----- cached elements  -----*/
    const scoresContainerEl = document.getElementById("scores-container")
    const bestScoreEl = document.getElementById("best-score")
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

    function init(){

        //Disable control buttons. Enable Start button
        greenBtnEl.disabled = true
        redBtnEl.disabled = true
        blueBtnEl.disabled = true
        yellowBtnEl.disabled = true
        centerBtnEl.disabled = false

        //Initialize variables
        simonPattern = []
        currentScore = 0
        stepCount = 0
        turn = 0
        currentPlayerStep = 0
        bestScore = 0

        //Prepare center button caption
        centerBtnEl.style.fontFamily = "Helvetica"
        centerBtnEl.innerHTML = "Start"
    }

    function render () {
        renderBestScore ()
        addNewStep ()
    }

    function renderBestScore() {
        bestScoreEl.innerText = bestScore

    }

    function addNewStep () {
        //Simon's pattern is generated as the game is played by adding a step to simonPattern array each cycle.
        //To add a new step, first a random number between 1-4 is generated (representing one of the four buttons)
        const randomNumber = Math.floor(Math.random()*4)+1 

        //The random number is used as a key to find the correspoding button in the options object (see constants section)
        //to push said button's label into the simonPattern array.
        simonPattern.push(options[randomNumber])

        stepCount++

        if (simonPattern.length > 1) {
            centerBtnEl.style.fontFamily = "Orbitron"
            centerBtnEl.innerText = simonPattern.length
        } else {
            centerBtnEl.style.fontFamily = "Helvetica"
            centerBtnEl.innerText = "Your turn!"
        }

        playSimonPattern ()

    }

    function playSimonPattern (){

        let index = stepCount-1

        if (stepCount <= simonPattern.length) {
            if (simonPattern[index]==="green-btn") {
                greenBtnClick()
                setTimeout(playSimonPattern, 600)

            } else if (simonPattern[index]==="red-btn") {
                redBtnClick()
                setTimeout(playSimonPattern, 600)

            } else if (simonPattern[index]==="yellow-btn") {
                yellowBtnClick()
                setTimeout(playSimonPattern, 600)

            } else if (simonPattern[index]==="blue-btn") {
                blueBtnClick ()
                setTimeout(playSimonPattern, 600)
            }

            stepCount++

        } else {
            turn = 1
            greenBtnEl.disabled = false
            redBtnEl.disabled = false
            blueBtnEl.disabled = false
            yellowBtnEl.disabled = false
            centerBtnEl.disabled = true

        }


    }

    function centerBtnClick(){
        render ()
    }

    function greenBtnClick(){
        if (turn===1) {
            if(verify ("green-btn")) {
                greenSound.play ()
            }  else {
                errorSound.play ()
            }     
        } else {
            greenSound.play()
        }

        greenBtnEl.style.backgroundColor = "rgb(99, 225, 99)"
        setTimeout(greenBtnRelease, 300)  
        

    }

    function greenBtnRelease () {
        greenBtnEl.style.backgroundColor = "rgb(39, 80, 39)"

    }

    function redBtnClick(){
        if (turn===1) {
            if(verify ("red-btn")) {
                redSound.play ()
            }  else {
                errorSound.play ()
            }     
        } else {
            redSound.play()
        }

        redBtnEl.style.backgroundColor = "rgb(255, 66, 63)"
        setTimeout(redBtnRelease, 300)  
    
    }

    function redBtnRelease() {
        redBtnEl.style.backgroundColor = "rgb(129, 37, 37)"

    }

    function blueBtnClick(){
        if (turn===1) {
            if(verify ("blue-btn")) {
                blueSound.play ()
            }  else {
                errorSound.play ()
            }     
        } else {
            blueSound.play()
        }
        blueBtnEl.style.backgroundColor = "rgb(68, 111, 255)"
        setTimeout(blueBtnRelease, 300)
        

    }

    function blueBtnRelease(){
        blueBtnEl.style.backgroundColor = "rgb(49, 78, 173)"

    }

    function yellowBtnClick(){
        if (turn===1) {
            if(verify ("yellow-btn")) {
                yellowSound.play ()
            }  else {
                errorSound.play ()
            }     
        } else {
            yellowSound.play()
        }

        yellowBtnEl.style.backgroundColor = "rgb(255, 255, 0)"
        setTimeout(yellowBtnRelease, 300)  

    }

    function yellowBtnRelease() {
        yellowBtnEl.style.backgroundColor = "rgb(146, 146, 34)"
    }

    function verify (selectedButton) {
        if (currentPlayerStep === simonPattern.length-1) {
            if (selectedButton === simonPattern[currentPlayerStep]){
                turn = 0
                currentPlayerStep = 0
                stepCount = 0
                setTimeout (render, 1000)
                return true
    
            } else {
                lose ()
                return false
            }
        } else {
            if (selectedButton === simonPattern[currentPlayerStep]){
                currentPlayerStep++
                return true
    
            } else {
                lose ()
                return false
            }

        }

    }

    function lose () {
        currentScore = simonPattern.length-1
        
        if (currentScore > bestScore) {
            bestScore = currentScore
        }

        bestScoreEl.innerText = bestScore

        errorSound.play()
        init()   
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