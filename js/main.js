'use strict'

var DIFFICULT_EASY = 16
var DIFFICULT_MEDIUM = 25
var DIFFICULT_HARD = 36
var gCurrDifficulty = DIFFICULT_EASY
var gInterval
var gStartTime

var gBoard = boardNums(gCurrDifficulty)
var gCounter = 1
function onInit() {
    renderBoard(gBoard, gCurrDifficulty)
}

function renderBoard(gBoard, difficulty) {
    const lineSize = gBoard.length ** 0.5
    var strHTML = ''
    for (var i = 0; i < lineSize; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < lineSize; j++) {
            const randomNum = drawNum()
            strHTML += `<td onclick="clickedCell(this, ${difficulty})" id="${randomNum}">${randomNum}</td>`
        }
        strHTML += '</tr>'
    }
    const elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}

function drawNum() {
    var randIdx = getRandomInt(0, gBoard.length)
    var num = gBoard[randIdx]
    gBoard.splice(randIdx, 1)
    return num
}

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}

function boardNums(difficulty) {
    const nums = []
    for (var i = 1; i <= difficulty; i++) {
        nums.push(i)
    }
    return nums
}

function clickedCell(elCell, difficulty) {
    const ckickedNum = +elCell.getAttribute('id')
    checkCellOrder(elCell, ckickedNum, difficulty)
}

function checkCellOrder(elCell, num, difficulty) {
    if (num === gCounter) {
        if (gCounter === 1) timer()
        gCounter++
        elCell.style.backgroundColor = 'white'
        elCell.style.color = 'black'
        if (gCounter !== difficulty + 1) PlaySound('stop-13692')
    }
    if (gCounter === difficulty + 1) {
        clearInterval(gInterval)
        const elPlayButton = document.querySelector('.play-again')
        const elBody = document.querySelector('body')
        const elHeader = document.querySelector('h1')
        PlaySound('decidemp3-14575')
        elPlayButton.style.display = 'inline'
        elBody.style.backgroundColor = 'rgb(209, 209, 209)'
        elHeader.innerHTML = 'Victory 🤖'
        elHeader.style.color = 'black'
        setTimeout(() => {
            elBody.style.backgroundColor = 'black'
            elHeader.style.color = 'white'
        }, 100)
    }
}

function playAgain(difficulty) {
    clearInterval(gInterval)
    PlaySound('stop-13692')
    gCounter = 1
    gCurrDifficulty = difficulty
    gBoard = boardNums(difficulty)
    renderBoard(gBoard, difficulty)
    const elHeader = document.querySelector('h1')
    elHeader.innerHTML = '<span onclick="changeHeaderColor(this)" letter="false">T</span>OUCH <span letter="false" onclick="changeHeaderColor(this)" >N</span>UMBERS'
    elHeader.style.color = 'rgb(209, 209, 209)'
    const elPlayButton = document.querySelector('.play-again')
    elPlayButton.style.display = 'none'
}

function PlaySound(sound) {
    var audio = new Audio('../sounds/' + sound + '.mp3')
    audio.play()
}

function changeHeaderColor(elLetter) {
    PlaySound('stop-13692')
    const letter = +elLetter.getAttribute('letter')
    const elHeader = document.querySelector('h1')
    if (letter) {
        elHeader.innerHTML = '<span onclick="changeHeaderColor(this)" letter="0">T</span>OUCH <span letter="0" onclick="changeHeaderColor(this)" >N</span>UMBERS'
        elHeader.style.color = 'rgb(209, 209, 209)'
    } else {
        elHeader.innerHTML = '<span onclick="changeHeaderColor(this)" letter="1">T</span>OUCH <span letter="1" onclick="changeHeaderColor(this)" >N</span>UMBERS'
        elHeader.style.color = 'white'
    }
}

function timer() {
    gStartTime = Date.now()
    gInterval = setInterval(() => {
        var currTime = (Date.now() - gStartTime) /1000
        var elTimer = document.querySelector('.timer')
        elTimer.innerHTML = currTime    
    }, 10)
}
