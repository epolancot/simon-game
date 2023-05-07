/*----- constants -----*/
const options = {
    "1": "green-btn",
    "2": "red-btn",
    "3": "yellow-btn",
    "4": "blue-btn"
}



/*----- state variables -----*/
    let turn, bestScore, currentScore;
    let simonPattern, playerPattern = []


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
    document.getElementById("center-btn").addEventListener("click", actionBtn)
    document.getElementById("green-btn").addEventListener("click", greenBtnClick)
    document.getElementById("red-btn").addEventListener("click", redBtnClick)
    document.getElementById("yellow-btn").addEventListener("click", yellowBtnClick)
    document.getElementById("blue-btn").addEventListener("click", blueBtnClick)


/*----- functions -----*/
    init();

    function init(){
        simonPattern = []
        playerPattern = []
        currentScore = 0
        if (bestScoreEl.innerText === "Best score:") { bestScore = 0 } 
        turn = 0;

        render ()
    }

    function render () {
        renderScores ()
        addToSimonPattern ()
    }

    function renderScores() {
        bestScoreEl.innerText = `Best score: ${bestScore}`
        currentScoreEl.innerText = `Current score: ${currentScore}`
    }

    function addToSimonPattern () {
        const randomNumber = Math.floor(Math.random()*4)+1
        simonPattern.push(options[randomNumber])
        playSimonPattern ()

    }

    function playSimonPattern (){
        for (let i=0;i<simonPattern.length;i++) {
            if (simonPattern[i]==="green-btn") {
                setTimeout(greenBtnClick, 100)

            } else if (simonPattern[i]==="red-btn") {
                setTimeout(redBtnClick, 100)

            } else if (simonPattern[i]==="yellow-btn") {
                setTimeout(yellowBtnClick, 500)

            } else if (simonPattern[i]==="red-btn") {
                setTimeout(blueBtnClick, 500)

            }
        }

    }

    function actionBtn(){
        alert("Center");
    }

    function greenBtnClick(){
        greenBtnEl.style.backgroundColor = "rgb(99, 225, 99)"
        setTimeout(greenBtnRelease, 200)   
    }

    function greenBtnRelease () {
        greenBtnEl.style.backgroundColor = "rgb(39, 80, 39)"

    }

    function redBtnClick(){
        redBtnEl.style.backgroundColor = "rgb(255, 66, 63)"
        setTimeout(redBtnRelease, 200)  
    
    }

    function redBtnRelease() {
        redBtnEl.style.backgroundColor = "rgb(129, 37, 37)"

    }

    function blueBtnClick(){
        blueBtnEl.style.backgroundColor = "rgb(68, 111, 255)"
        setTimeout(blueBtnRelease, 200)    
    }

    function blueBtnRelease(){
        blueBtnEl.style.backgroundColor = "rgb(49, 78, 173)"

    }

    function yellowBtnClick(){
        yellowBtnEl.style.backgroundColor = "rgb(255, 255, 0)"
        setTimeout(yellowBtnRelease, 200)  
    }

    function yellowBtnRelease() {
        yellowBtnEl.style.backgroundColor = "rgb(146, 146, 34)"
    }



    //compare user's pattern with computer's pattern

    //keep track of score

    //render()

