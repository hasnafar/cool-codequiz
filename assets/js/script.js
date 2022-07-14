// Global variables for selecting HTML elements are declared here.
var timerEl = document.getElementById('countdown');
var startButton = document.getElementById('start-button');
var submitButton = document.getElementById('submitBtn');
var viewhsButton =document.getElementById('seeScores');
const question = document.getElementById('question');
const choices = Array.from (document.getElementsByClassName('choice-text'));
const scoreText=document.getElementById('score');
var initial=document.getElementById('userInitial');
var clearScoresBtn =document.getElementById ('clearScores');
var reloadBtn =document.getElementById ('startAgain')

// Global helper variables are declared here.
var randomPlayerNumber = Math.floor(Math.random()*100)+1; 
var currentQuestion = {}; //
var acceptingAnswers = false;
var score = 0;
var questionCounter = 0;
var timeLeft = 40;
var availableQuestions = [];

var myQuestions = [
	{
		  question: "Commonly used data types DO NOT Include:",
			choice1: '1. strings',
			choice2: '2. booleans',
			choice3: '3. alerts',
      choice4: '4. numbers',
		  answer: 3
	},
	{
		question: "The condition in an if/else statement is enclosed with _____.",
			choice1: '1. quotes',
			choice2: '2. curly brackets',
			choice3: '3. parenthesis',
      choice4: '4. square brackets',
		  answer: 3
	},
  {
		question: "Arrays in JavaScript can be used to store _____.",
			choice1: '1. numbers and strings',
			choice2: '2. other arrays',
			choice3: '3. booleans',
      choice4: '4. all of the above',
		  answer: 4
	},
  {
		question: "String values must be enclosed within _____ when being assigned to variables.",
		  choice1: '1. commas',
			choice2: '2. curly brackets',
			choice3: '3. quotes',
      choice4: '4. parenthesis',
		  answer: 3
	},
  {
		question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    	choice1: '1. JavaScript',
			choice2: '2. terminal/bash',
			choice3: '3. for loops',
      choice4: '4. console.log',
	    answer: 4
	}
];

// Assigns question worth and max questions in the quiz
const Correct_Worth = 10;
const Max_Questions = 5;

// This function starts the game by displaying the questions.
function startGame() {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...myQuestions];

  getNewQuestion ();
};

// This function displays new questions one after another.

function getNewQuestion() {

   if (availableQuestions.length === 0 || questionCounter > Max_Questions) {
    timeLeft=0;
    return;
   }
  questionCounter++;
  const questionIndex = 0; 
  
  currentQuestion = availableQuestions[questionIndex];
  question.innerText=currentQuestion.question;

  choices.forEach( choice => {
    const number = choice.dataset ['number'];
    choice.innerText = currentQuestion['choice' + number];
  
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;

};

// This increments scores, gives feedback, and takes time off countdown if a question is wrong.
choices.forEach(choice => {
  choice.addEventListener("click", e =>{

    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    if (selectedAnswer == currentQuestion.answer) {
      document.getElementById('answerToQuestion').textContent='Correct!';
      incrementScore(Correct_Worth)

    } else {
      
      document.getElementById('answerToQuestion').textContent='Wrong!';
      timeLeft -= 10;

    }

    getNewQuestion();
  });
});

incrementScore =num => {
  score += num;
  scoreText.innerText = score;
};

// This function handles the timer.
function countdown() {
  
  const startQuiz = document.getElementById('start-quiz');
  startQuiz.style.display='none';
  
  document.getElementById('quiz-questions').style.display='block';

  var timeInterval = setInterval(function () {
    timerEl.textContent = timeLeft;
    timeLeft--;
    
    if (timeLeft <= -1) {
      clearInterval(timeInterval);
      timerEl.textContent = '';
      document.getElementById('quiz-questions').style.display='none';
      document.getElementById('all-done').style.display='block';
      scoreText.innerText = score;
      return;
    }
  
}, 1000);

}

// This function stores user initials and scores.
function storeInitials(event){
      var playerNames=document.getElementById('userInitial').value;
      if(playerNames.trim()=="")
        playerNames="Unknown"+randomPlayerNumber;
      localStorage[playerNames]=score;
      displayHighScores();
}

// This function displays user highscores
function displayHighScores(){
  document.getElementById('quiz-questions').style.display='none';
  document.getElementById('all-done').style.display='none';
  document.getElementById('start-quiz').style.display='none';
  document.getElementById('high-scores').style.display='block';

  
  var vals = Object.values(localStorage);
  var keys = Object.keys(localStorage);
  var sizeofLocalStorage = Object.keys(localStorage).length;

  
  
  for(var i=0;i<sizeofLocalStorage;i++){
    var hsTag = document.createElement("p");

    hsTag.textContent=i+1+". "+keys[i]+" - "+vals[i];
    document.getElementById("player1").appendChild(hsTag);

  }
}

// This function clears the scoreboard.
function clearScores () {
  localStorage.clear();
  const list = document.getElementById("player1");
  while (list.hasChildNodes()){
    list.removeChild (list.firstChild);
  }
}

// This function restarts the quiz.
function refreshPage(){
  window.location.reload();
}

// Adding event listeners to buttons.
startButton.addEventListener("click", countdown); 
submitButton.addEventListener("click", storeInitials);
viewhsButton.addEventListener("click", displayHighScores);
clearScoresBtn.addEventListener("click", clearScores);
reloadBtn.addEventListener("click",refreshPage);

// Starts the quiz
startGame();


