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
const pictureArray = [
  "img/berlin.jpg",
  "img/paris.jpg",
  "img/rom.jpg",
  "img/wien.jpg",
];

function start() {
  document.getElementById("start").remove();

  nextQuestion();
}

function reset() {
  location.reload();
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
  const resetButton = document.createElement("button");
  resetButton.setAttribute("onclick", `reset()`);
  const resetButtonText = document.createTextNode("Zum Start");
  resetButton.appendChild(resetButtonText);
  const answerButton = document.createElement("button");
  answerButton.setAttribute("onclick", `solution()`);
  const answerButtonText = document.createTextNode("Lösung");
  answerButton.appendChild(answerButtonText);
  const forwardButton = document.createElement("button");
  forwardButton.setAttribute("onclick", `nextQuestion()`);
  const forwardButtonText = document.createTextNode("Weiter");
  forwardButton.appendChild(forwardButtonText);
  footer.appendChild(resetButton);
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
    wrapper.style.backgroundImage = `linear-gradient(
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0.2)),url('${imageName}')`;
    wrapper.style.backgroundSize = "cover";
    wrapper.style.backgroundPosition = "center";
  }

  document.getElementById("start").remove();
}

function messageBox(message, duration = 3000, color = "#000") {
  const userMessage = document.getElementById("msg-wrapper");
  userMessage.textContent = message;
  userMessage.style.backgroundColor = color;
  userMessage.classList.add("message-wrapper");
  userMessage.style.opacity = 1;
  userMessage.style.visibility = "visible";
  userMessage.style.transition = "opacity 0.5s ease-in-out";

  setTimeout(() => {
    userMessage.style.opacity = 0;
    userMessage.style.visibility = "hidden";
    userMessage.classList.remove("msg-wrapper");
  }, duration);
}

function input(answerId) {
  const correctAnswer = currentQuestion.answers.find((answer) => {
    return answer.correct;
  });

  const blockButton = document.querySelectorAll(".answer");
  blockButton.forEach((buttons) => {
    buttons.disabled = true;
  });
  if (correctAnswer.id === answerId) {
    document.getElementById(answerId).classList.add("correct");
    messageBox("RICHTIG! :)", 2000, "	#a2cd5a");
  } else {
    document.getElementById(answerId).classList.add("incorrect");
    document.getElementById(correctAnswer.id).classList.add("correct");
    messageBox(
      "Leider falsch! Die richtige Antwort lautet " + correctAnswer.text,
      3000,
      "#ff4040"
    );
  }
}

function solution() {
  const correctAnswer = currentQuestion.answers.find((answer) => {
    return answer.correct;
  });
  document.getElementById(correctAnswer.id).classList.add("correct");
}
