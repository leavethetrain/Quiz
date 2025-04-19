const questions = [
  {
    question: "Welche Hauptstadt hat Deutschland?",
    id: 1,
    answers: [
      {
        text: "München",
        correct: false,
        id: "a",
      },
      {
        text: "Berlin",
        correct: true,
        id: "b",
      },
      {
        text: "Hamburg",
        correct: false,
        id: "c",
      },
      {
        text: "Hannover",
        correct: false,
        id: "d",
      },
    ],
  },
  {
    question: "Welche Hauptstadt hat Frankreich?",
    id: 2,
    answers: [
      {
        text: "Luxemburg",
        correct: false,
        id: "a",
      },
      {
        text: "Marseille",
        correct: false,
        id: "b",
      },
      {
        text: "Paris",
        correct: true,
        id: "c",
      },
      {
        text: "Istanbul",
        correct: false,
        id: "d",
      },
    ],
  },
  {
    question: "Welche Hauptstadt hat Italien?",
    id: 3,
    answers: [
      {
        text: "Rom",
        correct: true,
        id: "a",
      },
      {
        text: "Madrid",
        correct: false,
        id: "b",
      },
      {
        text: "Kabul",
        correct: false,
        id: "c",
      },
      {
        text: "Lima",
        correct: false,
        id: "d",
      },
    ],
  },
  {
    question: "Welche Hauptstadt hat Österreich?",
    id: 4,

    answers: [
      {
        text: "Schärding",
        correct: false,
        id: "a",
      },
      {
        text: "Braunau",
        correct: false,
        id: "b",
      },
      {
        text: "Tirol",
        correct: false,
        id: "c",
      },
      {
        text: "Wien",
        correct: true,
        id: "d",
      },
    ],
  },
];

console.log(questions);

let currentQuestion;

let currentPositionQuestion = -1;
const pictureArray = ["berlin.jpg", "paris.jpg", "rom.jpg", "wien.jpg"];

function start() {
  document.getElementById("start").remove();

  nextQuestion();
}

function editQuestion(questionElement) {
  const wrapper = document.createElement("div");
  wrapper.id = "display-question";
  const questionDiv = document.createElement("div");
  questionDiv.id = questionElement.id;
  const questionTitle = document.createElement("h1");
  questionTitle.id = "title";
  const questionText = document.createTextNode(questionElement.question);
  questionTitle.appendChild(questionText);
  const questionAnswers = document.createElement("div");
  questionAnswers.id = "buttonContent";

  questionDiv.appendChild(questionTitle);
  questionDiv.appendChild(questionAnswers);

  const answersCopy = [];
  questionElement.answers.forEach((answer) => {
    answersCopy.push(answer);
  });

  while (answersCopy.length > 0) {
    const randomPointer = Math.floor(Math.random() * answersCopy.length);
    const answer = answersCopy.splice(randomPointer, 1)[0];

    const answerDiv = document.createElement("button");
    answerDiv.id = answer.id;
    answerDiv.setAttribute("onclick", `input('${answer.id}')`);
    answerDiv.classList.add("answer");
    answerDiv.appendChild(document.createTextNode(answer.text));
    questionAnswers.appendChild(answerDiv);
  }

  const footer = document.createElement("footer");
  footer.id = "footer";
  const answerButton = document.createElement("button");
  answerButton.setAttribute("onclick", `solution()`);
  const answerButtonText = document.createTextNode("Lösung");
  answerButton.appendChild(answerButtonText);
  const forwardButton = document.createElement("button");
  forwardButton.setAttribute("onclick", `nextQuestion()`);
  const forwardButtonText = document.createTextNode("Weiter");
  forwardButton.appendChild(forwardButtonText);
  footer.appendChild(answerButton);
  footer.appendChild(forwardButton);

  document.body.appendChild(wrapper);
  wrapper.appendChild(questionDiv);
  document.body.appendChild(footer);
}

function nextQuestion() {
  if (currentQuestion) {
    document.getElementById(String(currentQuestion.id)).remove();
    document.getElementById("display-question").remove();
    document.getElementById("footer").remove();
  }

  if (currentPositionQuestion + 1 < questions.length) {
    currentPositionQuestion++;

    currentQuestion = questions[currentPositionQuestion];
  } else {
    currentPositionQuestion = 0;
    currentQuestion = questions[currentPositionQuestion];
  }

  editQuestion(currentQuestion);
  const imageName = pictureArray[currentPositionQuestion];
  const wrapper = document.getElementById("display-question");
  if (wrapper) {
    wrapper.style.backgroundImage = `url('${imageName}')`;
    wrapper.style.backgroundSize = "cover";
    wrapper.style.backgroundPosition = "center";
  }

  document.getElementById("start").remove();
}

function input(answerId) {
  const correctAnswer = currentQuestion.answers.find((answer) => {
    return answer.correct;
  });

  if (correctAnswer.id === answerId) {
    alert("Die Antwort ist richtig");
    document.getElementById(answerId).classList.add("correct");
  } else {
    alert("Die Antwort ist falsch");
    document.getElementById(answerId).classList.add("incorrect");
    document.getElementById(correctAnswer.id).classList.add("correct");
  }
}

function solution() {
  const correctAnswer = currentQuestion.answers.find((answer) => {
    return answer.correct;
  });
  document.getElementById(correctAnswer.id).classList.add("correct");
}
