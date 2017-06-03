/**
 * Created by dell on 2017/6/3.
 */
var canvas = document.getElementById('space');
var context = canvas.getContext('2d');
var timerInterval = 5; // ms
var cellWidth = 10; // please ensure: cellWidth > 2
var cellXLen = 50;  // please ensure: cellWidth * cellXLen = 500
var cellYLen = 50;  // please ensure: cellWidth * cellYLen = 500
var cells = [];
var radius=cellWidth/2;
var running = 0; //
var generation = 0;

function drawCell(x, y, state) {
    var cx = x * cellWidth;
    var cy = y * cellWidth;
    if (state && state == 1) {
        context.beginPath();
        context.fillStyle='#ffffff';
        context.arc(radius+radius*2*x,radius+radius*2*y,radius,0,2*Math.PI,false);
        context.closePath();
        context.fill();
    }
    else {
        context.clearRect(cx, cy, cellWidth, cellWidth);
    }
}

function init() {
    function setCell(x, y) {
        cells[[x, y]] = 1;
        drawCell(x, y, 1);
    }

    function initDraw() {
        setCell(1, 0);
        setCell(2, 1);
        setCell(2, 2);
        setCell(1, 2);
        setCell(0, 2);
    }

    initDraw();
}

function applyRule(x, y) {
    var liveCell = 0;
    var currentState = cells[[x, y]];

    for (var i = -1; i < 2; i++)
        for (var j = -1; j < 2; j++) {
            if(i==0 &&j==0){
                continue;
            }
            if(cells[[(x+i+cellXLen)%cellXLen, (y+j+cellXLen)%cellXLen]] &&
                cells[[(x+i+cellXLen)%cellXLen, (y+j+cellXLen)%cellXLen]]==1){
                liveCell++;
            }
        }

    if (currentState && currentState == 1) {
        if (liveCell < 2 || liveCell > 3) return 0;
        else return 1;
    }
    else {
        if (liveCell == 3) return 1;
        else return 0;
    }

}

function loadGame() {
    canvas.onmousedown = function (e) {
        if (running == 1) return;
        if (e.offsetX) {
            x = e.offsetX;
            y = e.offsetY;
        }
        else if (e.layerX) {
            x = e.layerX;
            y = e.layerY;
        }
        x = Math.floor(x / cellWidth);
        y = Math.floor(y / cellWidth);
        state = cells[[x, y]];
        if (state && state == 1) {
            cells[[x, y]] = 0;
            drawCell(x, y, 0);
        }
        else {
            cells[[x, y]] = 1;
            drawCell(x, y, 1);
        }
    }
    init();
}

function startGame() {
    function runGame() {
        var nextgen = [];
        for (x = 0; x < cellXLen; x++) {
            for (y = 0; y < cellYLen; y++) {
                nextgen[[x, y]] = applyRule(x, y);
            }
        }
        for (x = 0; x < cellXLen; x++) {
            for (y = 0; y < cellYLen; y++) {
                cells[[x, y]] = nextgen[[x, y]];
            }
        }
        for (x = 0; x < cellXLen; x++) {
            for (y = 0; y < cellYLen; y++) {
                drawCell(x, y, cells[[x, y]]);
            }
        }
        generation++;
        spanGen.innerHTML = generation;
        if (running == 1) setTimeout(runGame, timerInterval);
    }

    btnStart.disabled = true;
    btnPause.disabled = false;
    btnReset.disabled = true;
    btnRandom.disabled = true;
    running = 1;
    runGame();
}

function pauseGame() {
    running = 0;
    btnStart.disabled = false;
    btnPause.disabled = true;
    btnReset.disabled = false;
    btnRandom.disabled = false;
}

function resetGame() {
    for (x = 0; x < cellXLen; x++) {
        for (y = 0; y < cellYLen; y++) {
            cells[[x, y]] = 0;
            drawCell(x, y, 0);
        }
    }
    init();
    generation = 0;
    spanGen.innerHTML = generation;
}

function randomGame() {
    for (x = 0; x < cellXLen; x++) {
        for (y = 0; y < cellYLen; y++) {
            s = (Math.random() >= 0.8) ? 1 : 0;
            cells[[x, y]] = s;
            drawCell(x, y, s);
        }
    }
    generation = 0;
    spanGen.innerHTML = generation;
}

window.addEventListener("load", loadGame, true);

//点击按钮时事件
document.getElementById("btnStart").onclick=function () {
   startGame();
   return true;
};

document.getElementById("btnPause").onclick=function () {
    pauseGame();
    return true;
};

document.getElementById("btnReset").onclick=function () {
    resetGame();
    return true;
};

document.getElementById("btnRandom").onclick=function () {
    randomGame();
    return true;
};


