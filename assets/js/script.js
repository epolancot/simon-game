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
    let simonPattern, playerPattern = [] 


    let greenSound = new Audio('../sounds/green.mp3')
    let redSound = new Audio('../sounds/red.mp3')
    let blueSound = new Audio('../sounds/blue.mp3')
    let yellowSound = new Audio('../sounds/yellow.mp3')
    let errorSound = new Audio('../sounds/error.mp3')



/*----- cached elements  -----*/
    const scoresContainerEl = document.getElementById("scores-container")
    const bestScoreEl = document.getElementById("best-score")
    const currentScoreEl = document.getElementById("current-score")
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


/*----- functions -----*/
    init();

    function init(){

        greenBtnEl.disabled = true
        redBtnEl.disabled = true
        blueBtnEl.disabled = true
        yellowBtnEl.disabled = true

        simonPattern = []
        playerPattern = []
        currentScore = 0
        stepCount = 0
        centerBtnEl.innerHTML = "Start"
        if (bestScoreEl.innerText === "Best score:") { bestScore = 0 } 
        turn = 0
        currentPlayerStep = 0
    }

    function render () {
        renderScores ()
        addNewStep ()
    }

    function renderScores() {
        bestScoreEl.innerText = `Best score: ${bestScore}`
        currentScoreEl.innerText = `Current score: ${currentScore}`
    }

    function addNewStep () {
        //Simon's pattern is generated as the game is played by adding a step to simonPattern array each cycle.
        //To add a new step, first a random number between 1-4 is generated (representing one of the four buttons)
        const randomNumber = Math.floor(Math.random()*4)+1 

        //The random number is used as a key to find the correspoding button in the options object (see constants section)
        //to push said button's label into the simonPattern array.
        simonPattern.push(options[randomNumber])

        stepCount++

        playSimonPattern ()

    }

    function playSimonPattern (){
        // This function will call itself every half a second simonPattern.length times,
        // then switch turns.

        let index = stepCount-1

        if (stepCount <= simonPattern.length) {
            if (simonPattern[index]==="green-btn") {
                greenBtnClick()
                setTimeout(playSimonPattern, 500)

            } else if (simonPattern[index]==="red-btn") {
                redBtnClick()
                setTimeout(playSimonPattern, 500)

            } else if (simonPattern[index]==="yellow-btn") {
                yellowBtnClick()
                setTimeout(playSimonPattern, 500)

            } else if (simonPattern[index]==="blue-btn") {
                blueBtnClick ()
                setTimeout(playSimonPattern, 500)
            }

            stepCount++

        } else {
            turn = 1
            greenBtnEl.disabled = false
            redBtnEl.disabled = false
            blueBtnEl.disabled = false
            yellowBtnEl.disabled = false
            centerBtnEl.innerText = "Your turn!"
        }


    }

    function centerBtnClick(){
        render ()
    }

    function greenBtnClick(){
        greenSound.play()
        greenBtnEl.style.backgroundColor = "rgb(99, 225, 99)"
        setTimeout(greenBtnRelease, 200)  
        
        if (turn===1) {
        verify ("green-btn")       
        };
    }

    function greenBtnRelease () {
        greenBtnEl.style.backgroundColor = "rgb(39, 80, 39)"

    }

    function redBtnClick(){
        redSound.play()
        redBtnEl.style.backgroundColor = "rgb(255, 66, 63)"
        setTimeout(redBtnRelease, 200)  

        if (turn===1) {
            verify ("red-btn")       
        };
    
    }

    function redBtnRelease() {
        redBtnEl.style.backgroundColor = "rgb(129, 37, 37)"

    }

    function blueBtnClick(){
        blueSound.play()
        blueBtnEl.style.backgroundColor = "rgb(68, 111, 255)"
        setTimeout(blueBtnRelease, 200)
        
        if (turn===1) {
            verify ("blue-btn")       
        };
    }

    function blueBtnRelease(){
        blueBtnEl.style.backgroundColor = "rgb(49, 78, 173)"

    }

    function yellowBtnClick(){
        yellowSound.play()
        yellowBtnEl.style.backgroundColor = "rgb(255, 255, 0)"
        setTimeout(yellowBtnRelease, 200)  

        if (turn===1) {
            verify ("yellow-btn")       
        };
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
                setTimeout (render, 500)
    
            } else {
                errorSound.play()
                init()
            }
        } else {
            if (selectedButton === simonPattern[currentPlayerStep]){
                currentPlayerStep++
    
            } else {
                errorSound.play()
                init()
            }

        }

    }





