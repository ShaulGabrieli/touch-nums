
function PlaySound(sound) {
    var audio = new Audio('../sounds/' + sound + '.mp3')
    audio.play()
}

function boardNums(difficulty) {
    const nums = []
    for (var i = 1; i <= difficulty; i++) {
        nums.push(i)
    }
    return nums
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