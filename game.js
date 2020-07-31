var buttonColour = ["red", "blue", "green", "yellow"];
var level = 0;
gamePattern = [];
userClickedPattern = [];

var started = false;
$(document).keypress(function (event) {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSeq();
        started = true;
    }
});

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    checkAns(userClickedPattern.length - 1);
    playSound(userChosenColour);
    animatePress(userChosenColour);
});

function nextSeq() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNo = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColour[randomNo];
    //console.log((randomChosenColour));
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour)
        .fadeOut(100)
        .fadeIn(100)
        .fadeOut(100)
        .fadeIn(100);
    if (level > 1) {
        playSound(randomChosenColour);
    }

    console.log(userClickedPattern);
}

function playSound(name) {
    if (suc == true) {
        var audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
    }
    else {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
    }

}

function animatePress(currenColour) {
    $("#" + currenColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currenColour).removeClass("pressed");
    }, 100);
}

var suc = false;

function checkAns(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        suc = true;
        if (userClickedPattern.length === gamePattern.length) {
            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
                nextSeq();
            }, 1000);
        }
    }
    else {
        suc = false;
        console.log("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over. Press any Key to Restart");
        startOver();
    }
    
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
