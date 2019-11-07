var playerOneDice = rollDice();
var playerTwoDice = rollDice();
console.log("player one rolled "+playerOneDice+". player two rolled "+playerTwoDice+".");

document.querySelector(".dice .img1").setAttribute("src", "images/dice"+playerOneDice+".png");
document.querySelector(".dice .img2").setAttribute("src", "images/dice"+playerTwoDice+".png");

if (playerOneDice > playerTwoDice)
{
  document.querySelector(".container h1").textContent = "Player One Wins!"
}
else if (playerTwoDice > playerOneDice)
{
  document.querySelector(".container h1").textContent = "Player Two Wins!"
}
else
{
  document.querySelector(".container h1").textContent = "Draw"
}

function rollDice()
{
  return Math.floor((Math.random() * 6)) + 1;
}
