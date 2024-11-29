// Score
// Instrctrions
// Sqaures moving
// Sqaures to spawn in
// Combine squares when value is same
let score = 0
let cooldown = false
let gameFinished = false
let cantUseList = []
let gameRunning = true
let mapOfPositions = new Map([
    [1, [1, 76]], [2, [26, 76]], [3, [51, 76]], [4, [76, 76]],
    [5, [1, 51]], [6, [26, 51]], [7, [51, 51]], [8, [76, 51]],
    [9, [1, 26]], [10, [26, 26]], [11, [51, 26]], [12, [76, 26]],
    [13, [1, 1]], [14, [26, 1]], [15, [51, 1]], [16, [76, 1]]
])
let mapOfOccupied = new Map([
    [1, false], [2, false], [3, false], [4, false],
    [5, false], [6, false], [7, false], [8, false],
    [9, false], [10, false], [11, false], [12, false],
    [13, false], [14, false], [15, false], [16, false]
])
function setCookie(name, value, daysToLive) {
    const date = new Date();
    date.setTime(date.getTime() + (daysToLive * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}`;
}

function getCookie(name) {
    const decodedCookies = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookies.split("; ");
    let result = null;

    cookieArray.forEach(element => {
        if (element.indexOf(name) === 0) {
            result = element.substring(name.length + 1);
        }
    });

    return result;
}
function continueGame(){
    document.getElementById("winScreen").style.display = "none"
    gameRunning = true
}
function displayWinScreen(){
 
    document.getElementById("winScreen").style.display = "block"
}

function checkIf2048(){
    let boxList = Array.from(document.getElementById("mainContainer").children)
    for(box of boxList){
        if(box.innerText == "2048" && !gameFinished){
            displayWinScreen()
            gameRunning = false
            gameFinished = true

        }
    }
    
}
function updateHighScoreAndScore(){
    if((parseInt(getCookie("highScore")) || 0) < score){
        setCookie("highScore", score)
        highScoreBox.innerText = score
        document.getElementById("highScoreGameOverDisplay").innerText = score
    }
    scoreBox.innerText = score 
    document.getElementById("scoreGameOverDisplay").innerText = score
}
function gameOver(from){
    // window.location.reload();
    // console.log("attempted to end game from", from)
    document.getElementById("winScreen").style.display = "none"

    document.getElementById("gameOverScreen").style.display = "block"
}
function newGameReal(from){
    window.location.reload();
    console.log("attempted to end game from", from)
}
// Set highscore display to the cookie
let highScoreBox = document.getElementById("highScoreDisplay")
highScoreBox.innerText = parseInt(getCookie("highScore")) || 0

// Set the end screen highscore (in case it isn't beaten)
document.getElementById("highScoreGameOverDisplay").innerText = parseInt(getCookie("highScore")) || 0

// Set the score box to the current score
let scoreBox = document.getElementById("scoreDisplay")
scoreBox.innerText = score



function getUnocuppiedPositionsReverse(){
    
    let occupiedPos = getOccupiedPositions()
    return occupiedPos.reverse()
}
function getOccupiedPositions(){
    let unoccupiedPositions = []
    mapOfOccupied.forEach((occupiedTF, pos) => {
        if(occupiedTF){
            unoccupiedPositions.push(pos)
        }
    });
    
    return unoccupiedPositions
}
function getUnoccupiedPositions(){
    let unoccupiedPositions = []
    mapOfOccupied.forEach((occupiedTF, pos) => {
        if(!occupiedTF){
            unoccupiedPositions.push(pos)
        }
    });
    console.log(mapOfOccupied)
    console.log(unoccupiedPositions)
    return unoccupiedPositions
}
function getRandomPosAndId(){
    // Get an array of all unoccupied positions
    let unoccupiedPositions = getUnoccupiedPositions()
    // Get a position of this array (just which spot its in not the actual number)
    let randomItemPos = Math.ceil(Math.random()*unoccupiedPositions.length-1)
    // RandomPos is the x y of the box number which is the number at the randomItemPos
    let randomPos = mapOfPositions.get(unoccupiedPositions[randomItemPos])
    mapOfOccupied.set(unoccupiedPositions[randomItemPos], true)
    console.log(mapOfOccupied)
    return [randomPos, unoccupiedPositions[randomItemPos]]
}
function generate2or4(){
    let randomNumber = Math.random() // Make a random number between 0 and 1
    if(randomNumber<0.9){ // 90% chance its less the 0.9
        return "2" // Return 2 with 90% chance
    }
    return "4" // If its 2 it would have broken out by now so return 4
}

function colourBox(box){
    switch(box.innerText){
        case "2":
            box.style.backgroundColor = "LemonChiffon"
            break
        case "4":
            box.style.backgroundColor = "khaki"
            break
        case "8":
            box.style.backgroundColor = "sandybrown"
            break
        case "16":
            box.style.backgroundColor = "darkorange"
            break
        case "32":
            box.style.backgroundColor = "LightSalmon"
            break
        case "64":
            box.style.backgroundColor = "coral"
            break
        case "128":
            box.style.backgroundColor = "red"
            break
        case "256":
            box.style.backgroundColor = "maroon"
            break
        case "512":
            box.style.backgroundColor = "fireBrick"
            break
        case "1024":
            box.style.backgroundColor = "oliveDrab"
            break
        case "2048":
            box.style.backgroundColor = "yellow"
            break
        
    }      
}
function makeBox(){
    

    let randomPosAndId = getRandomPosAndId()
    console.log(randomPosAndId)
    if(!(randomPosAndId[0] == undefined)){
        let newBox = document.createElement("div") // Make a new element
        document.getElementById("mainContainer").append(newBox) // Make it a child of outerDiv

        newBox.className = "box" // Make it class of box so css style applies
        let x = randomPosAndId[0][0]
        let y = randomPosAndId[0][1]
        let boxNo = randomPosAndId[1]

        newBox.id = boxNo
        newBox.style.left = x+"%"
        newBox.style.bottom = y+"%"
        newBox.innerText = generate2or4()
        colourBox(newBox)
    }
    

}
function getStartOfLine(originalBoxPosition){
    switch(true){
        case originalBoxPosition < 5:
            // console.log(`Start Of Line For box ${originalBoxPosition} is 1`)
            return 1
        case 9 > originalBoxPosition && originalBoxPosition >= 5:
            // console.log(`Start Of Line For box ${originalBoxPosition} is 5`)
            return 5
        case 13 > originalBoxPosition && originalBoxPosition >= 9:
            // console.log(`Start Of Line For box ${originalBoxPosition} is 9`)
            return 9
        case originalBoxPosition >= 13:
            // console.log(`Start Of Line For box ${originalBoxPosition} is 13`)
            return 13        
    }
}
function forEachLeft(originalPos, occupiedPositions) {
    let startOfLine = getStartOfLine(originalPos);
    let box = document.getElementById(originalPos);
    let movedBox = false
    let breakOut = false
    function iterateLeft(i) {
        if((originalPos - i >= startOfLine) && !breakOut) {
            let boxOnLeft = document.getElementById(originalPos - i);
            
            if (!(boxOnLeft == null) && !(box == null)) {
                breakOut = true
                if(boxOnLeft.innerText == box.innerText && !cantUseList.includes(boxOnLeft.id)) {
                    cantUseList.push(boxOnLeft.id)
                    console.log(`Added ${boxOnLeft} to cantMoveList: ${cantUseList}`)

                    mapOfOccupied.set(originalPos-i, true)
                    mapOfOccupied.set(originalPos-i+1, false)
                    score = Number(score) + Number(boxOnLeft.innerText)
                    boxOnLeft.innerText = boxOnLeft.innerText * 2
                    updateHighScoreAndScore()
                    colourBox(boxOnLeft)
                    box.remove()
            
                }
            }

            if(boxOnLeft == null && !(box==null)) {
                
                box.style.left = mapOfPositions.get(originalPos - i)[0] + "%";
                box.id = originalPos-i
                console.log("moving box")
                mapOfOccupied.set(originalPos-i, true)
                mapOfOccupied.set(originalPos-i+1, false)
                console.log(mapOfOccupied)
                
            }

            setTimeout(function () {
                iterateLeft(i + 1); // Call the function with the next index after the timeout
            }, 75); // Set your desired timeout duration here (1000 milliseconds in this example)
        }
    }



    iterateLeft(1); // Start the iteration from index 1
}
function forEachRight(originalPos, occupiedPositions) {
    let startOfLine = getStartOfLine(originalPos);
    let box = document.getElementById(originalPos);
    let movedBox = false
    let breakOut = false
    function iterateRight(i) {
        if((originalPos + i <= startOfLine + 3) && !breakOut) {
            let boxOnRight = document.getElementById(originalPos + i);
            
            if (!(boxOnRight == null) && !(box == null)) {
                breakOut = true
                if(boxOnRight.innerText === box.innerText  && !cantUseList.includes(boxOnRight.id)) {
                    cantUseList.push(boxOnRight.id)
                    console.log(`Added ${boxOnRight} to cantMoveList: ${cantUseList}`)
                    
                    mapOfOccupied.set(originalPos+i, true)
                    mapOfOccupied.set(originalPos+i-1, false)
                    score = Number(score) + Number(boxOnRight.innerText)
                    boxOnRight.innerText = boxOnRight.innerText * 2
                    updateHighScoreAndScore()
                    colourBox(boxOnRight)
                    box.remove()
            
                }
            }

            if(boxOnRight == null && !(box==null)) {
                
                box.style.left = mapOfPositions.get(originalPos + i)[0] + "%";
                box.id = originalPos+i
                console.log("moving box")
                mapOfOccupied.set(originalPos+i, true)
                mapOfOccupied.set(originalPos+i-1, false)
                console.log(mapOfOccupied)
                
            }

            setTimeout(function () {
                iterateRight(i + 1); // Call the function with the next index after the timeout
            }, 75); // Set your desired timeout duration here (1000 milliseconds in this example)
        }

    }


    iterateRight(1); // Start the iteration from index 1
}
function forEachUp(originalPos, occupiedPositions) {
    let box = document.getElementById(originalPos);
    let breakOut = false
    function iterateUp(i) {
        if(((originalPos - i*4) > 0) && !breakOut) {
            let boxOnTop = document.getElementById(originalPos - i * 4);
            
            if (!(boxOnTop == null) && !(box == null)) {
                breakOut = true
                if(boxOnTop.innerText === box.innerText && !cantUseList.includes(boxOnTop.id)) {
                    cantUseList.push(boxOnTop.id)
                    console.log(`Added ${boxOnTop} to cantMoveList: ${cantUseList}`)
                    
                    mapOfOccupied.set(originalPos-  i*4, true)
                    mapOfOccupied.set(originalPos-(i-1)*4, false)
                    score = Number(score) + Number(boxOnTop.innerText)
                    boxOnTop.innerText = boxOnTop.innerText * 2
                    updateHighScoreAndScore()
                    colourBox(boxOnTop)
                    box.remove()
            
                }
            }

            if(boxOnTop == null && !(box==null)) {
                box.style.bottom = mapOfPositions.get(originalPos - i*4)[1] + "%";
                
                box.id = originalPos-i*4
                console.log("moving box")
                mapOfOccupied.set(originalPos-  i*4, true)
                mapOfOccupied.set(originalPos-(i-1)*4, false)
                console.log(mapOfOccupied)
                
            }

            setTimeout(function () {
                iterateUp(i + 1); // Call the function with the next index after the timeout
            }, 75); // Set your desired timeout duration here (1000 milliseconds in this example)
        }

    }


    iterateUp(1); // Start the iteration from index 1

}
function forEachDown(originalPos, occupiedPositions) {
    let box = document.getElementById(originalPos);
    let breakOut = false
    function iterateUp(i) {
        if(((originalPos + i*4) < 17) && !breakOut) {
            let boxOnbottom = document.getElementById(originalPos + i * 4);
            
            if (!(boxOnbottom == null) && !(box == null)) {
                breakOut = true
                
                if(boxOnbottom.innerText === box.innerText && !cantUseList.includes(boxOnbottom.id)) {
                    cantUseList.push(boxOnbottom.id)
                    console.log(`Added ${boxOnbottom} to cantMoveList: ${cantUseList}`)
                    
                    console.log("combined")
                    console.log(originalPos+  i*4, true)
                    console.log(originalPos+(i-1)*4, false)
                    mapOfOccupied.set(originalPos +  i*4, true)
                    mapOfOccupied.set(originalPos+(i-1)*4, false)
                    score = Number(score) + Number(boxOnbottom.innerText)
                    boxOnbottom.innerText = boxOnbottom.innerText * 2
                    updateHighScoreAndScore()
                    colourBox(boxOnbottom)
                    box.remove()
            
                }
            }

            if(boxOnbottom == null && !(box==null)) {
                box.style.bottom = mapOfPositions.get(originalPos + i*4)[1] + "%";
                
                box.id = originalPos+i*4
                console.log("moving box")
                console.log(originalPos+  i*4, true)
                console.log(originalPos+(i-1)*4, false)
                mapOfOccupied.set(originalPos+  i*4, true)
                mapOfOccupied.set(originalPos+(i-1)*4, false)
                console.log(mapOfOccupied)
                
            }

            setTimeout(function () {
                iterateUp(i + 1); // Call the function with the next index after the timeout
            }, 75); // Set your desired timeout duration here (1000 milliseconds in this example)
        }

    }


    iterateUp(1); // Start the iteration from index 1

}
function moveLeft(){
    let occupiedPositions = getOccupiedPositions()
    let willAnythingHappen = checkCanAnythingMove(occupiedPositions, "left")
    if(!cooldown && gameRunning){
        cooldown = true
        for(originalPos of occupiedPositions){
            forEachLeft(originalPos, occupiedPositions)          
        }
        setTimeout(function(){
            let occupiedPositions = getOccupiedPositions()

            cooldown = false
            console.log("should end game?:", shouldEndGame(occupiedPositions))
            
            if(willAnythingHappen){
                console.log("something happened")
                
                makeBox()

                
            }
            checkIf2048()
            if(shouldEndGame(occupiedPositions)){
                gameOver("moveLeft")
            }
            cantUseList = []
        }, 300)
    
    }

    // Set a timer that says cooldown has passes the moving runs asynchronous so we say this 400 millesconds 
    


}

function checkboxChanged(checkbox) {
    if (checkbox.checked) {
        document.getElementById("moveButtonContainer").style.display = "table"
    } else {
        document.getElementById("moveButtonContainer").style.display = "none"
    }
}
function moveRight(){
    let occupiedPositions = getUnocuppiedPositionsReverse()
    let willAnythingHappen = checkCanAnythingMove(occupiedPositions, "right")
    if(!cooldown && gameRunning){
        cooldown = true
        for(originalPos of occupiedPositions){
            forEachRight(originalPos, occupiedPositions)
        }
        setTimeout(function(){
            let occupiedPositions = getUnocuppiedPositionsReverse()
            cooldown = false
            
             if(willAnythingHappen){
                console.log("something happened")
                makeBox()

            }
            checkIf2048()
            if(shouldEndGame(occupiedPositions)){
                console.log("should end game?:", shouldEndGame(occupiedPositions))
                gameOver("moveRight")
            }
            cantUseList = []

        }, 300)
    }
    // Set a timer that says cooldown has passes the moving runs asynchronous so we say this 400 millesconds 
    
}
function moveUp(){
    let occupiedPositions = getOccupiedPositions()
    let willAnythingHappen = checkCanAnythingMove(occupiedPositions, "up")
    if(!cooldown && gameRunning){
        cooldown = true
        for(originalPos of occupiedPositions){
            forEachUp(originalPos, occupiedPositions)
        }
        setTimeout(function(){
            let occupiedPositions = getOccupiedPositions()

            cooldown = false
            
             if(willAnythingHappen){
                console.log("something happened")
                makeBox()

            }
            checkIf2048()
            console.log("should end game?:", shouldEndGame(occupiedPositions))
            if(shouldEndGame(occupiedPositions)){
                gameOver("moveUp")
            }
            cantUseList = []

        }, 300)
    }
    // Set a timer that says cooldown has passes the moving runs asynchronous so we say this 400 millesconds 
}
function moveDown(){
    let occupiedPositions = getUnocuppiedPositionsReverse()
    let willAnythingHappen = checkCanAnythingMove(occupiedPositions, "down")
    if(!cooldown && gameRunning){
        cooldown = true
        for(originalPos of occupiedPositions){
            forEachDown(originalPos, occupiedPositions)
        }
        setTimeout(function(){
            let occupiedPositions = getUnocuppiedPositionsReverse()
            if(willAnythingHappen){
                console.log("something happened")
                makeBox()

            }
            checkIf2048()
            console.log("should end game?:", shouldEndGame(occupiedPositions))
            if(shouldEndGame(occupiedPositions)){
                gameOver("moveDown")
            }
            cooldown = false
            cantUseList = []

        }, 300)
    }
    // Set a timer that says cooldown has passes the moving runs asynchronous so we say this 400 millesconds 
}

document.addEventListener("keydown", event => {event.key === "ArrowLeft" ? moveLeft():false})
document.addEventListener("keydown", event => {event.key === "ArrowRight" ? moveRight():false})
document.addEventListener("keydown", event => {event.key === "ArrowUp" ? moveUp():false})
document.addEventListener("keydown", event => {event.key === "ArrowDown" ? moveDown():false})

makeBox()
function shouldEndGame(occupiedPositions){
    let arrayOfDirections = ["left", "right", "up", "down"]
    for(direction of arrayOfDirections){
        let willAnythingHappenEachDirection = checkCanAnythingMove(occupiedPositions, direction)
        if(willAnythingHappenEachDirection){
            return false
        }
    }
    console.log("got here")
    return true
}
function checkAllBoxesFull(){
    for(let [key,value] of mapOfOccupied){
        if(value == false){
            return false
        }
    }
    return true
}
function checkCanAnythingMove(occupiedPositions, direction){
    for(originalPos of occupiedPositions){
        console.log(`${direction}, ${originalPos}`)
        let canMove = checkCanMove(originalPos, direction)
        console.log(canMove)
        if(canMove){
            return true
            
        }
    }
    return false
}   
function checkCanMove(originalPos, direction){
    let box = document.getElementById(originalPos)
    switch(direction){
        case "left":
            
            let boxOnLeft = document.getElementById(originalPos-1)
            if((boxOnLeft == null) && !(getStartOfLine(originalPos) == originalPos) && !(box==null)){
                console.log(`${direction} returned true because ${Number(box.id)} can move to ${Number(box.id)-1}`)
                return true
            }
            if(!(boxOnLeft == null) && !(box==null)){
                if(boxOnLeft.innerText == box.innerText){
                    console.log(`${direction} returned true because ${boxOnLeft.id} can combine with ${box}`)
                    return true
                }
            }
            return false
            
            break
        
        case "right":
            let boxOnRight = document.getElementById(originalPos+1)
            if((boxOnRight == null) && !(getStartOfLine(originalPos) + 3 == originalPos) && !(box==null)){
                console.log(`${direction} returned true because ${Number(box.id)} can move to ${Number(box.id)+1}`)

                return true
            }
            if(!(boxOnRight == null) && !(box==null)){
                if(boxOnRight.innerText == document.getElementById(originalPos).innerText){
                    console.log(`${direction} returned true because ${boxOnRight.id} can combine with ${box}`)

                    return true
                }
            }
            return false
            break
        case "up":
            let boxOnTop = document.getElementById(originalPos-4)
            if(boxOnTop == null && originalPos - 4 > 0 && !(box==null)){
                console.log(`${direction} returned true because ${Number(box.id)} can move to ${Number(box.id)-4}`)

                return true
            }
            if(!(boxOnTop == null) && !(box==null)){
                if(boxOnTop.innerText == document.getElementById(originalPos).innerText){
                    console.log(`${direction} returned true because ${boxOnTop.id} can combine with ${box}`)
                    return true
                }
            }
            return false
            break
        case "down":
            let boxOnBottom = document.getElementById(originalPos+4)
            if(boxOnBottom == null && originalPos + 4 < 17 && !(box==null)){
                console.log(`${direction} returned true because ${Number(box.id)} can move to ${Number(box.id)+4}`)
                return true
            }
            if(!(boxOnBottom == null) && !(box==null)){
                if(boxOnBottom.innerText == document.getElementById(originalPos).innerText){
                    console.log(`${direction} returned true because ${boxOnBottom.id} can combine with ${box}`)
                    return true
                }
            }
            return false
            break
    }

       
}
