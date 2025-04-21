const questions = [
  {
    question: "In welchem Jahr erschien Nirvanas Album 'Nevermind'?",
    id: 1,
    answers: [
      {
        text: "1989",
        correct: false,
        id: "a",
      },
      {
        text: "1991",
        correct: true,
        id: "b",
      },
      {
        text: "1993",
        correct: false,
        id: "c",
      },
      {
        text: "1995",
        correct: false,
        id: "d",
      },
    ],
  },
  {
    question: "Welcher Musiker war Frontmann von Alice in Chains?",
    id: 2,
    answers: [
      {
        text: "Chris Cornell",
        correct: false,
        id: "a",
      },
      {
        text: "Taylor Swift",
        correct: false,
        id: "b",
      },
      {
        text: "Dave Grohl",
        correct: false,
        id: "c",
      },
      {
        text: "Layne Staley",
        correct: true,
        id: "d",
      },
    ],
  },
  {
    question: "Welcher Song stammt von Pearl Jam?",
    id: 3,
    answers: [
      {
        text: "Smells Like Teen Spirit",
        correct: false,
        id: "a",
      },
      {
        text: "Man in the Box",
        correct: false,
        id: "b",
      },
      {
        text: "Mockingbird",
        correct: false,
        id: "c",
      },
      {
        text: "Black",
        correct: true,
        id: "d",
      },
    ],
  },
  {
    question: "Wofür steht 'MTV' bei 'MTV unplugged'?",
    id: 4,

    answers: [
      {
        text: "Music TeleVision",
        correct: true,
        id: "a",
      },
      {
        text: "Mega Tune Vibes",
        correct: false,
        id: "b",
      },
      {
        text: "Media Tech Vision",
        correct: false,
        id: "c",
      },
      {
        text: "Main Tune Video",
        correct: false,
        id: "d",
      },
    ],
  },
  {
    question: "Wer war der Leadsänger von Linkin Park bis 2017?",
    id: 5,

    answers: [
      {
        text: "Corey Taylor",
        correct: false,
        id: "a",
      },
      {
        text: "Mike Shinoda",
        correct: false,
        id: "b",
      },
      {
        text: "Justin Bieber",
        correct: false,
        id: "c",
      },
      {
        text: "Chester Bennington",
        correct: true,
        id: "d",
      },
    ],
  },
  {
    question: "Wie alt war Jimi Hendrix als er 1970 starb?",
    id: 6,

    answers: [
      {
        text: "28 Jahre",
        correct: false,
        id: "a",
      },
      {
        text: "30 Jahre",
        correct: false,
        id: "b",
      },
      {
        text: "33 Jahre",
        correct: false,
        id: "c",
      },
      {
        text: "27 Jahre",
        correct: true,
        id: "d",
      },
    ],
  },
  {
    question: "Was bedeutet die Abkürzung 'P.O.D'?",
    id: 7,

    answers: [
      {
        text: "Path Of Destiny",
        correct: false,
        id: "a",
      },
      {
        text: "Payable On Death",
        correct: true,
        id: "b",
      },
      {
        text: "Power of Determination",
        correct: false,
        id: "c",
      },
      {
        text: "People Of Desire",
        correct: false,
        id: "d",
      },
    ],
  },
];

console.log(questions);

let currentQuestion;
let currentPositionQuestion = -1;

const pictureArray = [
  "img/marshall.jpg",
  "img/musician.jpg",
  "img/band.jpg",
  "img/casette.jpg",
  "img/redguitar.jpg",
  "img/gitarre1.jpg",
  "img/drums.jpg",
];

function start() {
  const startSound = document.getElementById("start-sound");
  startSound.play();

  document.getElementById("wrapper-start").remove();

  nextQuestion();
}

function reset() {
  const startSound = document.getElementById("start-sound");
  startSound.play();
  setTimeout(() => {
    location.reload();
  }, 400);
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
  const startSound = document.getElementById("start-sound");
  startSound.play();
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
      rgba(0, 0, 0, 0.7),
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
  const startSound = document.getElementById("start-sound");
  startSound.play();

  setTimeout(() => {
    const correctAnswer = currentQuestion.answers.find((answer) => {
      return answer.correct;
    });
    document.getElementById(correctAnswer.id).classList.add("correct");
  }, 400);
}
