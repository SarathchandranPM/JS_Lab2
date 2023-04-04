//Quiz Prototype:

function Quiz(questions) {
  this.questions = questions;
  this.questionIndex = 0;
  this.score = 0;
}

//Funtion to fetch questions one by one from the questions array:

Quiz.prototype.getQuestionByIndex = function () {
  return this.questions[this.questionIndex];
};

//To check whether the quiz is ended or not:

Quiz.prototype.isEnded = function () {
  return this.questionIndex === this.questions.length;
};

//To check the answer :

Quiz.prototype.checkOptionWithAnswer = function (answer) {
  if (this.getQuestionByIndex().isCorrectAnswer(answer))
    //if the answer is correct increase the score:

    this.score++;

  //also go to next question:

  this.questionIndex++;
};

//Questions prototype:

function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

//Funtion to check correct answer:

Question.prototype.isCorrectAnswer = function (choice) {
  return this.answer === choice;
};

//Load questions to HTML page and display score:

function loadQuestions() {
  //First Check whether the quiz is completed or not. If quiz is completed show score:

  if (quiz.isEnded()) {
    showScore();
  }

  //Otherwise show next question:
  else {
    //You want to display the qn inside the paragraph with id 'question'.
    var element = document.getElementById("question");
    element.innerHTML = quiz.getQuestionByIndex().text;

    //After the question is loaded, show options:
    var choices = quiz.getQuestionByIndex().choices;
    for (var i = 0; i < choices.length; i++) {
      var element = document.getElementById("choice" + i);
      element.innerHTML = choices[i];
      handleOptionButton("btn" + i, choices[i]);
    }
    showProgress();
  }
}

//Handle click event on button to check answer ans display score:

function handleOptionButton(id, choice) {
  var button = document.getElementById(id);
  button.onclick = function () {
    quiz.checkOptionWithAnswer(choice);
    loadQuestions();
  };
}

//To show how many questions have been attended:

function showProgress() {
  var currentQn = quiz.questionIndex + 1;
  //Adding 1 because the index of first qn is zero but we want to display 1 for the first qn
  document.getElementById("progress").innerHTML =
    "Question" + currentQn + "of" + quiz.questions.length;
}

//Calculate score and display it:

function showScore() {
  var quizOverHtml = "<h1>Your Score</h1>";
  quizOverHtml +=
    "<h2 id='score'> Your scores: " +
    quiz.score +
    ". And mark percentage is: " +
    (quiz.score / questions.length) * 100 +
    "%" +
    "</h2>";

  document.getElementById("quiz").innerHTML = quizOverHtml;
}

var questions = [
  new Question(
    "What is the capital of India?",
    ["Option 1", "Option 2", "New Delhi", "Option 4"],
    "New Delhi"
  ),
  new Question(
    "What is the capital of Egypt?",
    ["Option 1", "Cairo", "Option 3", "Option 4"],
    "Cairo"
  ),
  new Question(
    "What is the capital of Canada?",
    ["Ottawa", "Option 2", "Option 3", "Option 4"],
    "Ottawa"
  ),
  new Question(
    "What is the capital of The Netherlands?",
    ["Option 1", "Option 2", "Option 3", "Amsterdam"],
    "Amsterdam"
  ),
  new Question(
    "What is the capital of Italy?",
    ["Option 1", "Option 2", "Rome", "Option 4"],
    "Rome"
  ),
];

//Create quiz:

var quiz = new Quiz(questions);

//Display quiz:

loadQuestions();
