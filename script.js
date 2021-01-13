
var step = 0;
var combination = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
var expires = new Date();
expires.setDate(expires.getDate() +30);
var path = 'path=/';
var countWinX = 0;
var countWinO = 0;
var countDraw =0;

window.onload = function(){
    // Load last winner from coockie
    var start, end;
    var decode = decodeURIComponent(document.cookie);
    start = decode.indexOf('winX');
    if (start != -1){
        start = decode.indexOf('=', start) + 1;
        end = decode.indexOf(';', start);
        if (end != -1){
            countWinX = decode.slice(start, end);
        } else {
            countWinX = decode.slice(start);
        }
        document.getElementById('resX').innerHTML = countWinX;
    }
    start = decode.indexOf('winO');
    if (start != -1){
        start = decode.indexOf('=', start) + 1;
        end = decode.indexOf(';', start);
        if (end != -1){
            countWinO = decode.slice(start, end);
        } else {
            countWinO = decode.slice(start);
        }
        document.getElementById('resO').innerHTML = countWinO;
    }
    start = decode.indexOf('draw');
    if (start != -1){
        start = decode.indexOf('=', start) + 1;
        end = decode.indexOf(';', start);
        if (end != -1){
            countDraw = decode.slice(start, end);
        } else {
            countDraw = decode.slice(start);
        }
        document.getElementById('draw').innerHTML = countDraw;
    }

    // Main function
    var cell = document.getElementsByClassName('square');
    var length = cell.length;
    for (let i = 0; i < length; i++) {
        attachment(cell[i]);
    }
}

// New turn
function attachment(cell) {
    cell.onclick = function() {
        if(!cell.hasChildNodes()) {
            var whoTurn = document.getElementById('turn');
            if(step % 2 == 0){
                cell.innerHTML = 'X';
                cell.classList.add('x');
                whoTurn.innerHTML = 'O';
                whoTurn.className = 'o';   
            }else{
                cell.innerHTML = 'O';
                cell.classList.add('o');
                whoTurn.innerHTML = 'X';
                whoTurn.className = 'x';  
            }
            step++;

            if (check()) {
                clear();
            }
        } else {
            alert("Ячейка занята");
        }
    }
}

// Check game status
function check(){
    var lenght = combination.length;
    var element = document.getElementsByClassName('square');
    var winX = document.getElementById('resX');
    var winO = document.getElementById('resO');
    var draw = document.getElementById('draw');
    for (let i = 0; i < lenght; i++){
        if (
            element[combination[i][0]].innerHTML != ''
            && element[combination[i][0]].innerHTML == element[combination[i][1]].innerHTML
            && element[combination[i][1]].innerHTML == element[combination[i][2]].innerHTML
        ) {
            alert('Выиграл игрок - ' + element[combination[i][0]].innerHTML);

            // Who win
            if(element[combination[i][0]].innerHTML == 'X'){
                countWinX++;
                winX.innerHTML = countWinX;
                document.cookie = `winX=${countWinX};expires=${expires.toUTCString()}; ${path}`
            }else{
                countWinO++;
                winO.innerHTML = countWinO;
                document.cookie = `winO=${countWinO};expires=${expires.toUTCString()}; ${path}`
            }
            return true;
        }
    }

    if(step == 9) {
        alert('Ничья');
        countDraw++;
        draw.innerHTML = countDraw;
        document.cookie = `draw=${countDraw};expires=${expires.toUTCString()}; ${path}`
        return true;
    }
    
    return false;
}

// Clear game field
function clear() {
    var element = document.getElementsByClassName('square');
    step = 0;
    for (let i = 0; i < element.length; i++){
        if(element[i].hasChildNodes()){
            let node = element[i].childNodes;
            element[i].classList.remove(element[i].innerHTML.toLowerCase());
            node[0].remove();
        }
    }
}

// Buttons
document.getElementById('new-game').onclick = function() {
    location.reload();
}

document.getElementById('clear').onclick = function() {
    clear();
}
