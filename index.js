const startPhase = $(".start");
const whaitGreenPhase = $(".wait-green");
const greenClickPhase = $(".green-click");
const tooSoonPhase = $(".too-soon");
const resultPhase = $(".result");
const finalScorePhase = $(".final-score");
const checkBoxContainer = $(".checkbox-container");
const restartButton = $(".restart");
const settingsButton = $(".options");

const gameContainer = $(".game-container");
const red = "background-red";
const green = "background-green";
const hidden = "hidden";


var rounds = 5;
var maxTimeout = 3500;
var minTimeout = 1500;
var scores = [];
var numOfTimes = 0;
var clickNow = false;
var redDontClick = false;
var clickedTooSoon = false;
var resulted = false;
var inDefault = true;
var finalScored = false;
var clickTorestart = 1;
var reactionInteval = 0;
var bestReactionInterval = 0;
var worstReactionInterval = 0;
var timeoutId;
var startTime;

function restartGame(){
    numOfTimes = 0;
    reactionInteval = 0;
    scores = [];
    bestReactionInterval = 0;
    worstReactionInterval = 0;
    clickNow = false;
    redDontClick = false;
    clickedTooSoon = false;
    resulted = false;
    inDefault = true;
    finalScored = false;
    finalScorePhase.addClass(hidden);
    startPhase.removeClass(hidden);
    tooSoonPhase.addClass(hidden);
    resultPhase.addClass(hidden);
    whaitGreenPhase.addClass(hidden);
    greenClickPhase.addClass(hidden);
    checkBoxContainer.addClass(hidden);
    restartButton.addClass(hidden);
    settingsButton.removeClass(hidden);
    clearTimeout(timeoutId);
}

function startGame(){
    startPhase.addClass(hidden);
    checkBoxContainer.addClass(hidden);
    settingsButton.addClass(hidden);
    clearTimeout(timeout1);
    inDefault = false;
    finalScored = false;
    numOfTimes++;
}

function nowRedWait(){
    resultPhase.addClass(hidden);
    whaitGreenPhase.removeClass(hidden);
    tooSoonPhase.addClass(hidden);
    gameContainer.addClass(red);
    restartButton.addClass(hidden);
    redDontClick = true;
    clearTimeout(timeoutId);
    timeoutId  = setTimeout(function(){
        if (!clickedTooSoon){
        clickGreen();
        console.log("click now: " + clickNow + " redDontClick: " + redDontClick + " clickedTooSoon: " + clickedTooSoon);
        console.log("click now: " + clickNow + " redDontClick: " + redDontClick + " clickedTooSoon: " + clickedTooSoon);
        }
    }, randomTime());
    
}

function clickGreen(){
    whaitGreenPhase.addClass(hidden);
    greenClickPhase.removeClass(hidden);
    gameContainer.removeClass(red);
    gameContainer.addClass(green);
    redDontClick = false;
    clickedTooSoon = false;
    clickNow = true;
    resulted = false;
    clearTimeout(timeoutId);
    reactionTime();
}

function tooSoon(){
    if (tooSoonPhase.hasClass(hidden) === false){
        clickNow = false;
        clickedTooSoon = false;
        redDontClick = true;
        nowRedWait();
        return;
    }
    tooSoonPhase.removeClass(hidden);
    whaitGreenPhase.addClass(hidden);
    gameContainer.removeClass(red);
    restartButton.removeClass(hidden);
    redDontClick = false;
    clickedTooSoon = true;
    clickNow = false;
    resulted = false;
    console.log("click now: " + clickNow + " redDontClick: " + redDontClick + " clickedTooSoon: " + clickedTooSoon);
}

function result(){
    greenClickPhase.addClass(hidden);
    resultPhase.removeClass(hidden);
    gameContainer.removeClass(green);
    restartButton.removeClass(hidden);
    $(".result h2").text(reactionInteval + "ms")
    clickNow = false;
    clickedTooSoon = false;
    redDontClick = false;
    resulted = true;
    numOfTimes++;
}

function finalScore(){
    resultPhase.addClass(hidden);
    finalScorePhase.removeClass(hidden);
    $(".average-score").text(averageScore() + "ms");
    $(".best-score").text(" " + bestReactionInterval + "ms");
    $(".worst-score").text(" " + worstReactionInterval + "ms");
    finalScored = true;
    clickTorestart = 2;
}

function randomTime(){
    var randomTime = Math.floor(Math.random() * maxTimeout) +  minTimeout;
    console.log(randomTime);
    return randomTime;
}

function averageScore(){
    var sum = 0;
    for (var i = 0; i < scores.length; i++){
        sum += scores[i];
    }

    return Math.round(sum / scores.length);
}

function reactionTime(){
    startTime = performance.now();
}

gameContainer.mousedown(function() {
    console.log("best: " + bestReactionInterval + " worst: " + worstReactionInterval + "scores: " + scores);
    if (finalScored){
        return;
    }

    if (clickTorestart !== 0){
        clickTorestart--;

        if (clickTorestart !== 0){
            return;
        }
    }

    if (numOfTimes === 0){
        startGame();
    }

    if (numOfTimes === rounds+1){
        finalScore();
        return;
    }

    if (numOfTimes > 0 && !inDefault){
        if (redDontClick){
            clickedTooSoon = true;
        }

        if(clickedTooSoon){
            tooSoon();
        }

        if(clickNow){
            var lastReactionInteval = reactionInteval;
            reactionInteval = Math.round(performance.now() - startTime);
            scores.push(reactionInteval);
            if (lastReactionInteval === 0){
                bestReactionInterval = reactionInteval;
                worstReactionInterval = reactionInteval;
            }

            else if(reactionInteval < bestReactionInterval){
                bestReactionInterval = reactionInteval;
            }

            else if(reactionInteval > worstReactionInterval){
                worstReactionInterval = reactionInteval;
            }
            result();
        }

        if(resulted){
            resulted = false;
        }

        else if(!redDontClick && !clickNow && !clickedTooSoon && !resulted){
            nowRedWait();
        }
    }

});

$(".final-score button").mousedown(function() {
    restartGame();
});

restartButton.mousedown(function() {
    restartGame();
});

settingsButton.mousedown(function() {
    checkBoxContainer.removeClass(hidden);
    checkBoxContainer.addClass("fadeIn");
    settingsButton.addClass("fadeOut");
    checkBoxContainer.removeClass("fadeOut");
    settingsButton.removeClass("fadeIn");
    settingsButton.addClass(hidden);
});

var timeout1;

checkBoxContainer.mouseleave(function(event) {
    if (event){
        timeout1 = setTimeout(function(){
            checkBoxContainer.addClass(hidden);
            settingsButton.removeClass(hidden);
            checkBoxContainer.addClass("fadeOut");
            settingsButton.addClass("fadeIn");
            checkBoxContainer.removeClass("fadeIn");
            settingsButton.removeClass("fadeOut");
        }, 250);
    }   
    
});

checkBoxContainer.mouseenter(function() {
    clearTimeout(timeout1);
});