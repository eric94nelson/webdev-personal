console.log("sadaaaaaaaaaa");

var sequence = [];
var playerSequenceIndex = 0;
var buttons = ["blue", "green", "red", "yellow"];
var gameActive = false;

document.addEventListener("keydown", function()
{
  if (!gameActive)
  {
    console.log("start game");
    gameActive = true;
    nextRound();
  }
});

$(".btn").click( function (event)
{
  console.log("click event.target.id "+event.target.id);
  highlightButton('#'+event.target.id);
  //no btns in sequence yet
  if (sequence.length === 0)
    gameOver();
  //correct answer
  else if (sequence[playerSequenceIndex] == event.target.id)
  {
    console.log("correct btn "+playerSequenceIndex+" "+sequence.length);
    var correctBtn = new Audio('sounds/'+event.target.id+'.mp3');
    correctBtn.play();

    if (playerSequenceIndex == sequence.length - 1)
    {
          setTimeout(nextRound, 450);
    }
    else
    {
      playerSequenceIndex ++;
    }
  }
  //wrong answer
  else
  {
    gameOver();
  }

});

function highlightButton(id)
{
  $(id).addClass("pressed");
  setTimeout(function () {
    $(id).removeClass("pressed");
  }, 100);
}

function nextRound()
{
  console.log("next round");
  playerSequenceIndex = 0;
  var random = Math.floor(Math.random(0,1) * 4);
  sequence.push(buttons[random]);
  $("#level-title").text("Level "+sequence.length);
  highlightButton('#'+buttons[random]);
  var nextBtn = new Audio('sounds/'+buttons[random]+'.mp3');
  nextBtn.play();
}

function gameOver ()
{
  console.log("game over");
  $("#level-title").text("Game over! Press any key to restart.");
  var wrong =  new Audio('sounds/wrong.mp3');
  wrong.play();
  sequence.length = 0;
  playerSequenceIndex = 0;
  gameActive = false;
  $("body").addClass("red");
  setTimeout(function () {
    $("body").removeClass("red");
  }, 150);
}
